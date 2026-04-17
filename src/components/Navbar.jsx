import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './navbar.css';
import Logo from '../assets/Logo.png';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, isLogged } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">

        {/* Logo */}
        <div className="d-flex align-items-center">
          <img
            src={Logo}
            alt="Logo"
            width="70"
            height="50"
            className="d-inline-block align-text-top me-2"
          />
          <span className="navbar-brand mb-0 h1">
            Biblioteca Virtual
          </span>
        </div>

        {/* Botón responsive */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse justify-content-center">
          <div className="navbar-nav text-center">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/catalog">Catálogo</Link>
            <Link className="nav-link" to="/blog">Blog</Link>
          </div>
        </div>

        {/* Usuario */}
        {isLogged ? (
          <div className="d-flex align-items-center gap-2">

            {/* Nombre usuario */}
            <span className="me-2">
              Hola, {user?.name} 👋
            </span>

            {/* Icono */}
            <Link to="/perfil" className="nav-link">
              <FaUserCircle size={28} />
            </Link>

            {/* Logout */}
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={logout}
            >
              Salir
            </button>
          </div>
        ) : (
          <Link className="btn btn-secondary" to="/login">
            Iniciar Sesión
          </Link>
        )}

      </div>
    </nav>
  );
};

export default Navbar;