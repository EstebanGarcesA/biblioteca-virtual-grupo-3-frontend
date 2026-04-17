import App from '../App'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
export let routerApp = [
    {
        path: "/",
        element: <App />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]