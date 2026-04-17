import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import './Navbar.css';
import { FaRegUserCircle } from 'react-icons/fa';
import {
  clearCurrentUser,
  demoUsers,
  getCurrentUser,
  setCurrentUser,
} from '../helpers/demoAuth';

const navItems = [
  { label: 'Home', href: '#inicio' },
  { label: 'Catalogo', href: '#catalogo' },
  { label: 'Blog', to: '/' },
  { label: 'Crear', to: '/crear-post', requiresAuth: true },
];

const Navbar = () => {
  const location = useLocation();
  const [currentUser, setCurrentUserState] = useState(getCurrentUser());

  useEffect(() => {
    const syncUser = () => setCurrentUserState(getCurrentUser());
    syncUser();
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, [location.pathname]);

  const handleUserChange = (event) => {
    const nextUserId = event.target.value;
    setCurrentUser(nextUserId);
    window.dispatchEvent(new Event('storage'));
  };

  const handleLogout = () => {
    clearCurrentUser();
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <nav className="navbar navbar-expand-lg blog-navbar">
      <div className="container-fluid blog-navbar__container">
        <Link className="blog-navbar__brand" to="/">
          <img
            src={Logo}
            alt="Logo Biblioteca Virtual"
            width="70"
            height="50"
            className="blog-navbar__logo"
          />
          <span className="navbar-brand mb-0">Biblioteca Virtual</span>
        </Link>

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

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav text-center blog-navbar__links">
            {navItems
              .filter((item) => !item.requiresAuth || currentUser)
              .map((item) => (
              item.to ? (
                <Link
                  key={item.label}
                  className={`nav-link${location.pathname === item.to ? ' active' : ''}`}
                  aria-current={location.pathname === item.to ? 'page' : undefined}
                  to={item.to}
                >
                  {item.label}
                </Link>
              ) : (
                <a key={item.label} className="nav-link" href={item.href}>
                  {item.label}
                </a>
              )
            ))}
          </div>
        </div>

        {currentUser ? (
          <div className="blog-navbar__session">
            <label className="blog-navbar__userpicker">
              <FaRegUserCircle />
              <select
                value={currentUser.id}
                onChange={handleUserChange}
                aria-label="Usuario actual"
              >
                {demoUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" className="blog-navbar__logout" onClick={handleLogout}>
              Salir
            </button>
          </div>
        ) : (
          <Link className="blog-navbar__login" to="/login">
            Iniciar sesion
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
