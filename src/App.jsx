import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import BookDetail from './pages/BookDetail';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import './App.css';
import PrivateRoute from './router/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route
            path="/detalle/:id"
            element={
              <PrivateRoute>
                <BookDetail />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/blog" element={<div>Próximamente</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;