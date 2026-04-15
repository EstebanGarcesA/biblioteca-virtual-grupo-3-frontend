import React from 'react'
import './navbar.css';
import Logo from '../assets/Logo.png';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = ({ isLoggedIn }) => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <div className="d-flex align-items-center">
                    <img src={Logo} alt="Logo" width="70" height="50"
                        className="d-inline-block align-text-top me-2" />
                    <span className="navbar-brand mb-0 h1">Biblioteca Virtual</span>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                    <div className="navbar-nav text-center">
                        <a className="nav-link active" aria-current="page" href="#home">Home</a>
                        <a className="nav-link" href="#catalog">Catálogo</a>
                        <a className="nav-link" href="#blog">Blog</a>
                    </div>
                </div>

                {isLoggedIn ? (
                    <div className="nav-profile">
                        <a className="nav-link" href="/perfilusuario.html" title="Perfil de usuario">
                            <FaUserCircle size={28} />
                        </a>
                    </div>
                ) : (
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="inicioSesionDropdown"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Iniciar Sesión
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="inicioSesionDropdown">
                            <li><a className="dropdown-item" href="/login.html">Inicio Estudiante</a></li>
                            <li><a className="dropdown-item" href="/admin/login.html">Inicio Administrador</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar