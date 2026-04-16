import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';
import Logo from '../assets/Logo.png';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Logo" width="70" height="50" className="d-inline-block align-text-top me-2" />
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
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/catalogo">
              Catálogo
            </NavLink>
            <NavLink className="nav-link" to="/">
              Blog
            </NavLink>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          {user ? (
            <>
              <span className="text-dark">{user.name}</span>
              <button className="btn btn-outline-secondary" type="button" onClick={logout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link className="btn btn-outline-secondary" to="/login">
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar