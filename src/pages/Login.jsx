import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setMessage('Por favor, completa todos los campos.');
      return;
    }
    auth.login(email);
    navigate(from, { replace: true });
  };

  return (
    <main className="login-page">
      <Navbar />
      <section className="container py-5" style={{ minHeight: '70vh' }}>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h2 className="mb-4 text-center">Iniciar sesión</h2>
                <p className="text-center text-muted">Inicia sesión para reservar libros y guardar tus preferencias.</p>
                {auth.isLogged && (
                  <div className="alert alert-info">Ya estás conectado como {auth.user.email}.</div>
                )}
                {message && <div className="alert alert-warning">{message}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-info w-100">
                    Iniciar sesión
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Login;
