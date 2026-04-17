import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { routerApp } from './router/routerApp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={createBrowserRouter(routerApp)} />
  </StrictMode>,
)