import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Textura de niebla para la edición Halloween (src/assets/img/fog.webp):
// banco de bruma más denso abajo que se deshace hacia arriba, repetible en
// horizontal (el ruido es periódico en x) para desplazarla en bucle con
// transform. Ruido de valor fractal hecho a mano (mulberry32 + interpolación
// suave) — una cadena de sharp con raw/extend/blur dejaba rayas. Color fijo
// claro y la forma en el alfa; se codifica una sola vez.
//
// Uso: node scripts/generate-fog.mjs
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, '..', 'src', 'assets', 'img', 'fog.webp')
const W = 768
const H = 192

function mulberry32(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const rand = mulberry32(1031)

// Capa de ruido: rejilla de cx × cy valores, periódica en x.
function layer(cx, cy) {
  const g = new Float32Array(cx * cy)
  for (let i = 0; i < g.length; i++) g[i] = rand()
  const smooth = (t) => t * t * (3 - 2 * t)
  return (u, v) => {
    const x = u * cx
    const y = v * (cy - 1)
    const x0 = Math.floor(x)
    const y0 = Math.floor(y)
    const sx = smooth(x - x0)
    const sy = smooth(y - y0)
    const xa = ((x0 % cx) + cx) % cx
    const xb = (xa + 1) % cx
    const ya = Math.min(y0, cy - 1)
    const yb = Math.min(y0 + 1, cy - 1)
    const top = g[ya * cx + xa] + (g[ya * cx + xb] - g[ya * cx + xa]) * sx
    const bot = g[yb * cx + xa] + (g[yb * cx + xb] - g[yb * cx + xa]) * sx
    return top + (bot - top) * sy
  }
}

// Octavas alargadas en horizontal (la niebla se estira, no hace grumos redondos).
const octaves = [
  { f: layer(3, 3), amp: 1 },
  { f: layer(6, 4), amp: 0.55 },
  { f: layer(12, 6), amp: 0.3 },
  { f: layer(24, 10), amp: 0.16 },
  { f: layer(48, 16), amp: 0.08 },
]
const ampSum = octaves.reduce((s, o) => s + o.amp, 0)
const smoothstep = (e0, e1, x) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

// Borde superior del banco: ondula despacio a lo largo del ancho (también periódico).
const edgeNoise = layer(5, 2)

const rgba = Buffer.alloc(W * H * 4)
for (let y = 0; y < H; y++) {
  const v = y / (H - 1)
  for (let x = 0; x < W; x++) {
    const u = x / W
    const edge = 0.06 + 0.34 * edgeNoise(u, 0.5)
    const bank = smoothstep(edge, Math.min(1, edge + 0.62), v)
    let n = 0
    for (const o of octaves) n += o.f(u, v) * o.amp
    n /= ampSum
    // Jirones: aun al fondo del banco la densidad varía (no es un muro plano).
    const wisps = smoothstep(0.28, 0.78, n)
    const a = Math.round(bank * (0.22 + 0.78 * wisps) * 200)
    const i = (y * W + x) * 4
    rgba[i] = 236
    rgba[i + 1] = 230
    rgba[i + 2] = 220
    rgba[i + 3] = a
  }
}

// Alfa sin pérdida: con alphaQuality < 100 el degradado sale en escalones.
await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
  .webp({ quality: 80, alphaQuality: 100, effort: 6 })
  .toFile(OUT)
console.log('ok', OUT)
