import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import BlogPage from './pages/BlogPage';
import CreatePostPage from './pages/CreatePostPage';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/crear-post"
        element={(
          <ProtectedRoute>
            <CreatePostPage />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/post/:slug"
        element={(
          <ProtectedRoute>
            <PostPage />
          </ProtectedRoute>
        )}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
