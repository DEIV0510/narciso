// Catálogo real de Narciso Parfum. Datos provistos por el cliente — no se
// inventan nombres, precios ni categorías. Todas las fragancias comparten el
// mismo frasco/etiqueta real (foto de source-material/botellabien.png), tal
// como se venden realmente: mismo envase, distinta esencia por dentro.
//
// Para agregar más productos en el futuro: solo hace falta añadir un objeto
// más a este arreglo (o crear un nuevo arreglo y hacer spread en `products`
// más abajo). No hay que tocar ningún componente.

export const CATEGORIES = {
  CABALLERO: 'Perfumería Caballero',
  DAMA: 'Perfumería Dama',
  UNISEX: 'Perfumería Unisex',
}

// `style` = familia olfativa general (Fresco / Dulce / Intenso / Elegante),
// solo para agrupar en el buscador de fragancias — es una clasificación
// orientativa de conocimiento público sobre estas fragancias reales, no un
// dato provisto por el cliente ni una característica inventada del producto.
const caballero = [
  { title: 'King of Seduction', brand: 'Antonio Banderas', style: 'Dulce' },
  { title: 'Acqua di Gio Parfum', brand: 'Giorgio Armani', style: 'Fresco' },
  { title: 'Blue Seduction', brand: 'Antonio Banderas', style: 'Fresco' },
  { title: 'Acqua di Gio', brand: 'Giorgio Armani', style: 'Fresco' },
  { title: 'Armani Code EDT', brand: 'Giorgio Armani', style: 'Elegante' },
  { title: 'Stronger With You Tobacco', brand: 'Giorgio Armani', style: 'Intenso' },
  { title: 'Stronger With You Intensely', brand: 'Giorgio Armani', style: 'Intenso' },
  { title: 'Acqua di Gio Profumo', brand: 'Giorgio Armani', style: 'Elegante' },
  { title: 'Aqva Pour Homme', brand: 'Bvlgari', style: 'Fresco' },
  { title: 'Burberry Hero EDP', brand: 'Burberry', style: 'Intenso' },
  { title: 'Man in Black', brand: 'Bvlgari', style: 'Intenso' },
  { title: 'Bvlgari Man', brand: 'Bvlgari', style: 'Elegante' },
  { title: '212 Sexy Men', brand: 'Carolina Herrera', style: 'Fresco' },
  { title: 'Euphoria', brand: 'Calvin Klein', style: 'Intenso' },
  { title: 'Eternity', brand: 'Calvin Klein', style: 'Elegante' },
  { title: '212 NYC', brand: 'Carolina Herrera', style: 'Fresco' },
  { title: '212 VIP Black Red', brand: 'Carolina Herrera', style: 'Intenso' },
  { title: '212 VIP Black Extra', brand: 'Carolina Herrera', style: 'Intenso' },
  { title: '212 VIP Black', brand: 'Carolina Herrera', style: 'Intenso' },
  { title: '212 VIP Black I Love NY', brand: 'Carolina Herrera', style: 'Intenso' },
  { title: '212 VIP', brand: 'Carolina Herrera', style: 'Fresco' },
  { title: 'Réserve Privée', brand: 'Givenchy', style: 'Elegante' },
  { title: 'Sauvage EDT', brand: 'Dior', style: 'Fresco' },
  { title: 'CH Privé EDT', brand: 'Carolina Herrera', style: 'Elegante' },
].map((p) => toProduct(p, CATEGORIES.CABALLERO, 'hombre'))

const dama = [
  { title: 'Sì EDP Intensely', brand: 'Giorgio Armani', style: 'Dulce' },
  { title: 'Thank U, Next', brand: 'Ariana Grande', style: 'Dulce' },
  { title: 'Ari', brand: 'Ariana Grande', style: 'Dulce' },
  { title: 'Acqua di Gioia', brand: 'Giorgio Armani', style: 'Fresco' },
  { title: 'Mod Vanilla', brand: 'Ariana Grande', style: 'Dulce' },
  { title: 'Cloud Pink', brand: 'Ariana Grande', style: 'Dulce' },
  { title: 'Her Elixir', brand: 'Burberry', style: 'Intenso' },
  { title: 'Miss Dior Parfum', brand: 'Dior', style: 'Elegante' },
  { title: 'Her EDP', brand: 'Burberry', style: 'Dulce' },
  { title: 'Euphoria', brand: 'Calvin Klein', style: 'Intenso' },
  { title: '212 Sexy', brand: 'Carolina Herrera', style: 'Fresco' },
  { title: 'Sweet Candy', brand: 'Ariana Grande', style: 'Dulce' },
  { title: 'Sì', brand: 'Giorgio Armani', style: 'Dulce' },
  { title: 'Good Girl Blush', brand: 'Carolina Herrera', style: 'Dulce' },
  { title: '212 VIP', brand: 'Carolina Herrera', style: 'Fresco' },
  { title: '212 VIP Rosé', brand: 'Carolina Herrera', style: 'Fresco' },
  { title: 'Good Girl Glam', brand: 'Carolina Herrera', style: 'Intenso' },
  { title: 'Chance Eau Fraîche', brand: 'Chanel', style: 'Fresco' },
  { title: 'La Bomba', brand: 'Carolina Herrera', style: 'Elegante' },
  { title: 'Good Girl Blush Elixir', brand: 'Carolina Herrera', style: 'Intenso' },
  { title: 'Miss Dior Blooming Bouquet', brand: 'Dior', style: 'Fresco' },
  { title: 'Chance', brand: 'Chanel', style: 'Elegante' },
  { title: 'CH Sublime', brand: 'Carolina Herrera', style: 'Elegante' },
  { title: 'Libre', brand: 'YSL', style: 'Elegante' },
].map((p) => toProduct(p, CATEGORIES.DAMA, 'mujer'))

// Ampliación de catálogo (agosto 2026): referencias reales adicionales que el
// cliente compartió en su hoja de cálculo de códigos (259 referencias en
// total). Se agregaron solo las que no duplicaban el catálogo ya existente;
// marca, título y familia olfativa se verificaron uno por uno por internet
// (no se inventó ningún dato). Mismo precio plano $60.000 que el resto de
// la colección.
const caballeroAgosto2026 = [
  { title: 'Stronger With You', brand: 'Giorgio Armani', style: 'Intenso' },
  { title: 'Pour Homme', brand: 'Bvlgari', style: 'Fresco' },
  { title: 'IN2U for Him', brand: 'Calvin Klein', style: 'Fresco' },
  { title: 'One Shock for Him', brand: 'Calvin Klein', style: 'Fresco' },
  { title: 'CH Africa', brand: 'Carolina Herrera', style: 'Dulce' },
  { title: 'Bad Boy', brand: 'Carolina Herrera', style: 'Intenso' },
  { title: 'Bad Boy Elixir', brand: 'Carolina Herrera', style: 'Intenso' },
  { title: 'CH Men', brand: 'Carolina Herrera', style: 'Elegante' },
  { title: 'Santos de Cartier', brand: 'Cartier', style: 'Elegante' },
  { title: 'Allure Homme Sport', brand: 'Chanel', style: 'Fresco' },
  { title: 'Bleu de Chanel', brand: 'Chanel', style: 'Fresco' },
  { title: 'Dior Homme Sport', brand: 'Dior', style: 'Fresco' },
  { title: 'Bad', brand: 'Diesel', style: 'Intenso' },
  { title: 'Pour Homme Intenso', brand: 'Dolce & Gabbana', style: 'Intenso' },
  { title: 'K by Dolce & Gabbana', brand: 'Dolce & Gabbana', style: 'Fresco' },
  { title: 'Light Blue pour Homme', brand: 'Dolce & Gabbana', style: 'Fresco' },
  { title: 'The One for Men', brand: 'Dolce & Gabbana', style: 'Elegante' },
  { title: 'The One Sport', brand: 'Dolce & Gabbana', style: 'Fresco' },
  { title: 'Blue Label', brand: 'Givenchy', style: 'Fresco' },
  { title: 'Drakkar Noir', brand: 'Guy Laroche', style: 'Intenso' },
  { title: 'Bottled Night', brand: 'Hugo Boss', style: 'Intenso' },
  { title: 'Bottled Parfum', brand: 'Hugo Boss', style: 'Elegante' },
  { title: 'Bottled Elixir', brand: 'Hugo Boss', style: 'Intenso' },
  { title: 'In Motion', brand: 'Hugo Boss', style: 'Fresco' },
  { title: 'Orange', brand: 'Hugo Boss', style: 'Fresco' },
  { title: 'Red', brand: 'Hugo Boss', style: 'Fresco' },
  { title: 'The Scent Elixir', brand: 'Hugo Boss', style: 'Intenso' },
  { title: 'Bottled Tonic', brand: 'Hugo Boss', style: 'Fresco' },
  { title: 'Bottled Unlimited', brand: 'Hugo Boss', style: 'Fresco' },
  { title: 'Le Beau Le Parfum', brand: 'Jean Paul Gaultier', style: 'Dulce' },
  { title: 'Le Beau Paradise Garden', brand: 'Jean Paul Gaultier', style: 'Fresco' },
  { title: 'Scandal Pour Homme', brand: 'Jean Paul Gaultier', style: 'Dulce' },
  { title: 'Le Male Le Parfum', brand: 'Jean Paul Gaultier', style: 'Dulce' },
  { title: 'Le Male Elixir Absolu', brand: 'Jean Paul Gaultier', style: 'Intenso' },
  { title: 'Le Male', brand: 'Jean Paul Gaultier', style: 'Fresco' },
  { title: 'Ultra Male', brand: 'Jean Paul Gaultier', style: 'Intenso' },
  { title: 'L.12.12 Blanc', brand: 'Lacoste', style: 'Fresco' },
  { title: 'Red', brand: 'Lacoste', style: 'Fresco' },
  { title: 'L.12.12 Noir', brand: 'Lacoste', style: 'Intenso' },
  { title: 'Explorer Platinum', brand: 'Montblanc', style: 'Elegante' },
  { title: 'Starwalker', brand: 'Montblanc', style: 'Elegante' },
  { title: 'Toy Boy', brand: 'Moschino', style: 'Intenso' },
  { title: 'Voyage', brand: 'Nautica', style: 'Fresco' },
  { title: 'Black XS L\'Excès', brand: 'Paco Rabanne', style: 'Intenso' },
  { title: 'Invictus Onyx', brand: 'Paco Rabanne', style: 'Fresco' },
  { title: 'Invictus Parfum', brand: 'Paco Rabanne', style: 'Fresco' },
  { title: 'Invictus Platinum', brand: 'Paco Rabanne', style: 'Fresco' },
  { title: 'Invictus Victory Elixir', brand: 'Paco Rabanne', style: 'Intenso' },
  { title: 'Invictus Legend', brand: 'Paco Rabanne', style: 'Fresco' },
  { title: 'Invictus', brand: 'Paco Rabanne', style: 'Fresco' },
  { title: '1 Million Elixir', brand: 'Paco Rabanne', style: 'Intenso' },
  { title: '1 Million Lucky', brand: 'Paco Rabanne', style: 'Dulce' },
  { title: '1 Million', brand: 'Paco Rabanne', style: 'Dulce' },
  { title: '1 Million Privé', brand: 'Paco Rabanne', style: 'Intenso' },
  { title: 'Phantom Parfum', brand: 'Paco Rabanne', style: 'Elegante' },
  { title: 'Phantom Intense', brand: 'Paco Rabanne', style: 'Intenso' },
  { title: 'Black XS L\'Aphrodisiaque', brand: 'Paco Rabanne', style: 'Intenso' },
  { title: 'Luna Rossa Carbon', brand: 'Prada', style: 'Fresco' },
  { title: 'Luna Rossa Ocean', brand: 'Prada', style: 'Fresco' },
  { title: 'Polo Ultra Blue', brand: 'Ralph Lauren', style: 'Fresco' },
  { title: 'Polo Red', brand: 'Ralph Lauren', style: 'Fresco' },
  { title: 'A*Men', brand: 'Mugler', style: 'Dulce' },
  { title: 'Tommy', brand: 'Tommy Hilfiger', style: 'Fresco' },
  { title: 'Uomo Born in Roma', brand: 'Valentino', style: 'Elegante' },
  { title: 'Uomo', brand: 'Valentino', style: 'Elegante' },
  { title: 'Uomo Born in Roma Extradose', brand: 'Valentino', style: 'Intenso' },
  { title: 'Uomo Born in Roma Green Stravaganza', brand: 'Valentino', style: 'Fresco' },
  { title: 'Pour Homme Dylan Blue', brand: 'Versace', style: 'Fresco' },
  { title: 'Eros Flame', brand: 'Versace', style: 'Intenso' },
  { title: 'Eros Energy', brand: 'Versace', style: 'Fresco' },
  { title: 'Eros', brand: 'Versace', style: 'Fresco' },
  { title: 'Swiss Army Classic', brand: 'Victorinox', style: 'Fresco' },
  { title: 'MYSLF Le Parfum', brand: 'Yves Saint Laurent', style: 'Intenso' },
  { title: '9PM Night Out', brand: 'Afnan', style: 'Intenso' },
  { title: 'Fahrenheit', brand: 'Dior', style: 'Intenso' },
].map((p) => toProduct(p, CATEGORIES.CABALLERO, 'hombre'))

const damaAgosto2026 = [
  { title: 'CK IN2U', brand: 'Calvin Klein', style: 'Fresco' },
  { title: '212 VIP Wild Party', brand: 'Carolina Herrera', style: 'Fresco' },
  { title: 'Devotion', brand: 'Dolce & Gabbana', style: 'Dulce' },
  { title: 'Black Opium', brand: 'Yves Saint Laurent', style: 'Dulce' },
  { title: 'Coco Mademoiselle', brand: 'Chanel', style: 'Elegante' },
  { title: 'Nº5', brand: 'Chanel', style: 'Elegante' },
  { title: 'L\'Imperatrice 3', brand: 'Dolce & Gabbana', style: 'Fresco' },
  { title: 'Light Blue', brand: 'Dolce & Gabbana', style: 'Fresco' },
  { title: 'Q', brand: 'Dolce & Gabbana', style: 'Dulce' },
  { title: 'Sorbetto Rosso', brand: 'Escada', style: 'Fresco' },
  { title: 'Agua del Sol', brand: 'Escada', style: 'Fresco' },
  { title: 'Miami Blossom', brand: 'Escada', style: 'Fresco' },
  { title: 'Ange ou Démon', brand: 'Givenchy', style: 'Intenso' },
  { title: 'Irresistible', brand: 'Givenchy', style: 'Elegante' },
  { title: 'Organza', brand: 'Givenchy', style: 'Elegante' },
  { title: 'Pineapple', brand: 'Dolce & Gabbana', style: 'Fresco' },
  { title: 'Scandal', brand: 'Jean Paul Gaultier', style: 'Dulce' },
  { title: 'La Belle Le Parfum', brand: 'Jean Paul Gaultier', style: 'Dulce' },
  { title: 'Divine Le Parfum', brand: 'Jean Paul Gaultier', style: 'Elegante' },
  { title: 'La Vie Est Belle L\'Elixir', brand: 'Lancôme', style: 'Dulce' },
  { title: 'La Nuit Trésor', brand: 'Lancôme', style: 'Dulce' },
  { title: 'BFF', brand: 'Kim Kardashian', style: 'Dulce' },
  { title: 'Meow', brand: 'Katy Perry', style: 'Dulce' },
  { title: 'Omnia Pink Sapphire', brand: 'Bvlgari', style: 'Fresco' },
  { title: 'Omnia Amethyste', brand: 'Bvlgari', style: 'Elegante' },
  { title: 'Omnia Crystalline', brand: 'Bvlgari', style: 'Fresco' },
  { title: 'Toy 2 Bubble Gum', brand: 'Moschino', style: 'Dulce' },
  { title: 'Toy 2', brand: 'Moschino', style: 'Fresco' },
  { title: 'Fame', brand: 'Paco Rabanne', style: 'Dulce' },
  { title: 'Lady Million', brand: 'Paco Rabanne', style: 'Dulce' },
  { title: 'Lady Million Lucky', brand: 'Paco Rabanne', style: 'Dulce' },
  { title: 'Lady Million Royal', brand: 'Paco Rabanne', style: 'Dulce' },
  { title: 'Olympéa Parfum', brand: 'Paco Rabanne', style: 'Elegante' },
  { title: 'Can Can', brand: 'Paris Hilton', style: 'Fresco' },
  { title: 'Sofía', brand: 'Sofía Vergara', style: 'Dulce' },
  { title: 'Donna Born in Roma Coral Fantasy', brand: 'Valentino', style: 'Fresco' },
  { title: 'Donna Born in Roma', brand: 'Valentino', style: 'Dulce' },
  { title: 'Bright Crystal Parfum', brand: 'Versace', style: 'Fresco' },
  { title: 'Crystal Noir Parfum', brand: 'Versace', style: 'Intenso' },
  { title: 'Pour Femme Dylan Purple', brand: 'Versace', style: 'Dulce' },
  { title: 'Eros Pour Femme', brand: 'Versace', style: 'Fresco' },
  { title: 'Bombshell', brand: 'Victoria\'s Secret', style: 'Fresco' },
  { title: 'Coconut Passion', brand: 'Victoria\'s Secret', style: 'Dulce' },
  { title: 'Pure Seduction', brand: 'Victoria\'s Secret', style: 'Fresco' },
  { title: 'Love Addict', brand: 'Victoria\'s Secret', style: 'Dulce' },
  { title: 'Velvet Petals', brand: 'Victoria\'s Secret', style: 'Dulce' },
  { title: 'Carmina', brand: 'Creed', style: 'Elegante' },
  { title: 'Yara Candy', brand: 'Lattafa', style: 'Dulce' },
  { title: 'Yara', brand: 'Lattafa', style: 'Dulce' },
  { title: 'Yara Tous', brand: 'Lattafa', style: 'Dulce' },
  { title: 'Yara Moi', brand: 'Lattafa', style: 'Intenso' },
  { title: 'Nolita', brand: 'Bond No. 9', style: 'Fresco' },
  { title: 'Yum Yum', brand: 'Armaf', style: 'Dulce' },
  { title: 'Noble Blush', brand: 'Lattafa', style: 'Dulce' },
  { title: 'Exclusive Azure Fantasy', brand: 'Orientica', style: 'Fresco' },
  { title: 'Donna Born in Roma Green Stravaganza', brand: 'Valentino', style: 'Dulce' },
  { title: 'Mallow Madness', brand: 'Lattafa', style: 'Dulce' },
  { title: 'Paradoxe Intense', brand: 'Prada', style: 'Elegante' },
  { title: 'Aventus for Her', brand: 'Creed', style: 'Fresco' },
].map((p) => toProduct(p, CATEGORIES.DAMA, 'mujer'))

const unisex = [
  { title: 'CK One Reflections', brand: 'Calvin Klein', style: 'Fresco' },
  { title: 'CK One', brand: 'Calvin Klein', style: 'Fresco' },
  { title: 'Petits et Mamans', brand: 'Bvlgari', style: 'Dulce' },
  { title: '9AM Dive', brand: 'Afnan', style: 'Fresco' },
  { title: 'Karpos', brand: 'Ahli', style: 'Dulce' },
  { title: 'Vega', brand: 'Ahli', style: 'Dulce' },
  { title: 'Octans', brand: 'Ahli', style: 'Fresco' },
  { title: 'Canes', brand: 'Ahli', style: 'Fresco' },
  { title: 'Island Bliss', brand: 'Armaf', style: 'Dulce' },
  { title: 'Odyssey Mandarin Sky Elixir', brand: 'Armaf', style: 'Intenso' },
  { title: 'Onyx', brand: 'Bharara', style: 'Intenso' },
  { title: 'Niche Femme', brand: 'Bharara', style: 'Elegante' },
  { title: 'Bleecker Street', brand: 'Bond No. 9', style: 'Elegante' },
  { title: 'Aventus', brand: 'Creed', style: 'Intenso' },
  { title: 'Centaurus', brand: 'Creed', style: 'Intenso' },
  { title: 'Sugardaddy', brand: 'Fugazzi', style: 'Intenso' },
  { title: 'Bianco Latte', brand: 'Giardini di Toscana', style: 'Dulce' },
  { title: 'Amber Oud Aqua Dubai', brand: 'Al Haramain', style: 'Fresco' },
  { title: 'Il Mexico', brand: 'Ilmin', style: 'Elegante' },
  { title: 'Il Dolce', brand: 'Ilmin', style: 'Dulce' },
  { title: 'Il Femme', brand: 'Ilmin', style: 'Intenso' },
  { title: 'Il Kakuno', brand: 'Ilmin', style: 'Intenso' },
  { title: 'Il Orgasme', brand: 'Ilmin', style: 'Intenso' },
  { title: 'Art of Universe', brand: 'Lattafa', style: 'Fresco' },
  { title: 'Bade\'e Al Oud Amethyst', brand: 'Lattafa', style: 'Dulce' },
  { title: 'Bade\'e Al Oud Honor & Glory', brand: 'Lattafa', style: 'Dulce' },
  { title: 'Bade\'e Al Oud Sublime', brand: 'Lattafa', style: 'Dulce' },
  { title: 'Khamrah Qahwa', brand: 'Lattafa', style: 'Dulce' },
  { title: 'Santal 33', brand: 'Le Labo', style: 'Elegante' },
  { title: 'Imagination', brand: 'Louis Vuitton', style: 'Fresco' },
  { title: 'L\'Immensite', brand: 'Louis Vuitton', style: 'Fresco' },
  { title: 'Ombre Nomade', brand: 'Louis Vuitton', style: 'Intenso' },
  { title: 'Symphony', brand: 'Louis Vuitton', style: 'Fresco' },
  { title: 'Baccarat Rouge 540', brand: 'Maison Francis Kurkdjian', style: 'Dulce' },
  { title: 'Oud Maracuja', brand: 'Maison Crivelli', style: 'Intenso' },
  { title: 'Red Tobacco', brand: 'Mancera', style: 'Intenso' },
  { title: 'Arabians Tonka', brand: 'Montale', style: 'Dulce' },
  { title: 'Starry Nights', brand: 'Montale', style: 'Elegante' },
  { title: 'Hacivat', brand: 'Nishane', style: 'Fresco' },
  { title: 'Intense Cafe', brand: 'Montale', style: 'Dulce' },
  { title: 'Layton', brand: 'Parfums de Marly', style: 'Elegante' },
  { title: 'Erba Pura', brand: 'Xerjoff', style: 'Fresco' },
  { title: 'Althaïr', brand: 'Parfums de Marly', style: 'Dulce' },
  { title: 'Instant Crush', brand: 'Mancera', style: 'Dulce' },
  { title: 'Flamenco', brand: 'Ramón Monegal', style: 'Intenso' },
  { title: 'Eclaire', brand: 'Lattafa', style: 'Dulce' },
  { title: 'Club de Nuit Milestone', brand: 'Armaf', style: 'Fresco' },
  { title: 'Sex-Sea', brand: 'Lorenzo Pazzaglia', style: 'Fresco' },
  { title: 'Sun-Gria', brand: 'Lorenzo Pazzaglia', style: 'Dulce' },
  { title: 'Black Orchid', brand: 'Tom Ford', style: 'Intenso' },
  { title: 'Neroli Portofino', brand: 'Tom Ford', style: 'Fresco' },
  { title: 'Rehab', brand: 'Initio Parfums Privés', style: 'Elegante' },
  { title: 'Herod', brand: 'Parfums de Marly', style: 'Intenso' },
  { title: 'New York Signature', brand: 'Bond No. 9', style: 'Intenso' },
  { title: 'Levar del Sole', brand: 'Xerjoff Casamorati', style: 'Dulce' },
  { title: 'Angels\' Share', brand: 'Kilian Paris', style: 'Dulce' },
  { title: 'Pacific Chill', brand: 'Louis Vuitton', style: 'Fresco' },
  { title: 'The Queen and the Viper', brand: 'Stéphane Humbert Lucas 777', style: 'Intenso' },
  { title: 'Elysium Pour Homme', brand: 'Roja Parfums', style: 'Elegante' },
  { title: 'Speachless', brand: 'Lorenzo Pazzaglia', style: 'Intenso' },
  { title: 'Costa Azzurra', brand: 'Tom Ford', style: 'Fresco' },
].map((p) => toProduct(p, CATEGORIES.UNISEX, 'unisex'))

function slugify(...parts) {
  return parts
    .join('-')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function toProduct({ title, brand, style }, category, gender) {
  return {
    id: slugify(title, brand, gender),
    title,
    brand,
    style,
    fullName: `${title} by ${brand}`,
    price: 60000,
    category,
    gender,
    // Foto real (source-material/botellabien.png): mismo frasco/etiqueta para
    // toda la colección, tal como se vende realmente. Si en el futuro hay
    // fotos individuales por fragancia, basta con cambiar este campo.
    image: 'catalog-bottle',
  }
}

// Se agregan nuevas cargas de catálogo haciendo spread aquí.
export const products = [...caballero, ...dama, ...caballeroAgosto2026, ...damaAgosto2026, ...unisex]

export const brands = [...new Set(products.map((p) => p.brand))].sort((a, b) => a.localeCompare(b, 'es'))

export function formatCOP(amount) {
  return `$${amount.toLocaleString('es-CO')} COP`
}

function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
}

export function searchProducts(list, query) {
  const q = normalize(query.trim())
  if (!q) return list
  return list.filter((p) => normalize(`${p.title} ${p.brand} ${p.fullName}`).includes(q))
}

export function getProductById(id) {
  return products.find((p) => p.id === id) || null
}

// Recomienda hasta `limit` productos reales del catálogo relacionados por
// familia olfativa, marca de inspiración o género — nunca aleatorio y nunca
// fuera del catálogo real.
export function getRelatedProducts(product, limit = 4) {
  if (!product) return []
  const others = products.filter((p) => p.id !== product.id)

  // El género pesa más que estilo/marca para que nunca se recomiende un
  // producto de la sección contraria (Caballero/Dama) antes que uno real del
  // mismo género.
  const score = (p) => {
    let s = 0
    if (p.gender === product.gender) s += 4
    if (p.style && product.style && p.style === product.style) s += 2
    if (p.brand === product.brand) s += 2
    return s
  }

  return others
    .map((p) => ({ p, s: score(p) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ p }) => p)
}
