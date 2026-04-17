import App from '../App'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import AdminDashboardPlaceholder from '../pages/placeholders/AdminDashboardPlaceholder'
import UserProfilePlaceholder from '../pages/placeholders/UserProfilePlaceholder'

export const routerApp = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboardPlaceholder />,
  },
  {
    path: '/usuario/perfil',
    element: <UserProfilePlaceholder />,
  },
]
