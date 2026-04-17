import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { demoUsers, setCurrentUser } from '../helpers/demoAuth';
import './LoginPage.css';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedUserId, setSelectedUserId] = useState(demoUsers[0].id);

  const redirectPath = useMemo(
    () => location.state?.from?.pathname || '/',
    [location.state],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentUser(selectedUserId);
    window.dispatchEvent(new Event('storage'));
    navigate(redirectPath, { replace: true });
  };

  return (
    <main className="login-page">
      <Navbar />

      <section className="login-shell">
        <div className="login-card">
          <p className="login-kicker">Acceso</p>
          <h1>Inicia sesion para continuar</h1>
          <p className="login-copy">
            El blog puede verse sin iniciar sesion, pero para leer articulos
            completos, crear publicaciones o eliminar las tuyas necesitamos una
            sesion activa.
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-field">
              <span>Selecciona un usuario demo</span>
              <select
                value={selectedUserId}
                onChange={(event) => setSelectedUserId(event.target.value)}
              >
                {demoUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>

            <button type="submit" className="login-submit">
              Iniciar sesion
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default LoginPage;
