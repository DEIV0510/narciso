import { Link, useLocation } from 'react-router-dom'

// Enlace a una sección de la página de inicio (ej. "#catalogo"). Si ya
// estamos en "/", es un ancla normal (el scroll suave nativo, vía CSS, ya
// funciona). Si estamos en otra ruta (ej. una ficha de producto), navega a
// "/" + hash con react-router — ScrollManager se encarga de hacer scroll a
// esa sección una vez cargada la página de inicio.
export default function SectionLink({ href, children, ...rest }) {
  const { pathname } = useLocation()

  if (pathname === '/') {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <Link to={`/${href}`} {...rest}>
      {children}
    </Link>
  )
}
