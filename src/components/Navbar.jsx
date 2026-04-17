import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './navbar.css'
import Logo from '../assets/Logo.png'

const Navbar = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    auth.logout()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img
            src={Logo}
            alt="Logo"
            width="70"
            height="50"
            className="d-inline-block align-text-top me-2"
          />
          <span className="navbar-brand mb-0 h1">Biblioteca Virtual</span>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
          <div className="navbar-nav text-center">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/catalog">
              Catálogo
            </Link>
            <Link className="nav-link" to="/blog">
              Blog
            </Link>
            {auth.isLogged && (
              <Link className="nav-link" to="/crear-post">
                Crear
              </Link>
            )}
          </div>
        </div>

        <div className="d-flex align-items-center">
          {auth.isLogged ? (
            <>
              <span className="navbar-text me-3">Hola, {auth.user.name}</span>
              <button type="button" className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link className="btn btn-secondary" to="/login">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
