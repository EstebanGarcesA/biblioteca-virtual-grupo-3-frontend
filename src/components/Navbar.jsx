import React from 'react'
import './navbar.css';
import Logo from '.././assets/Logo.png';

const Navbar = () => {
    return (

        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                
                <div class="d-flex align-items-center">
                    <img src={Logo} alt="Logo" width="70" height="50"
                        class="d-inline-block align-text-top me-2" />
                    <span class="navbar-brand mb-0 h1">Biblioteca Virtual</span>
                </div>

                 
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

               
                <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                    <div class="navbar-nav text-center">
                        <a class="nav-link active" aria-current="page" href="index.html">Home</a>
                        <a class="nav-link" href="./public/home/catalog.html">Catalogo</a>
                        <a class="nav-link" href="public/home/Blog.html">Blog</a>
                    </div>
                </div>

                
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="inicioSesionDropdown"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Iniciar Sesión
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="inicioSesionDropdown">
                        <li><a class="dropdown-item" href="./public/home/login.html">Inicio Estudiante</a></li>
                        <li><a class="dropdown-item" href="./public/admin-interfase/login.html">Inicio Administrador</a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>

    )
}

export default Navbar