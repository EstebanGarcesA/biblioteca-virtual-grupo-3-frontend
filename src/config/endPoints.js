/**
 * En desarrollo, deja `VITE_API_URL` vacío para usar el proxy de Vite hacia el backend (evita CORS).
 * En producción, define `VITE_API_URL` con la URL pública de la API (ej. https://api.midominio.com).
 */
const base = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

const withBase = (path) => (base ? `${base}${path}` : path)

export const end_points = {
  usuarios: withBase('/usuarios'),
  perfiles: withBase('/perfiles'),
  roles: withBase('/roles'),
}
