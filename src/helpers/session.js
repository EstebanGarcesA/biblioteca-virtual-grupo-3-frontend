const SESSION_KEY = 'biblioteca_sesion_usuario'
export const SESSION_EVENT = 'biblioteca-session-changed'

/**
 * Sesión local: datos del usuario tras login (credenciales aparte en sessionStorage).
 * @typedef {{ id: number, email: string, name?: string, rolDescripcion: string, perfilId?: number }} SesionUsuario
 */

/** @returns {SesionUsuario | null} */
export function obtenerSesion() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (data && typeof data.id === 'number' && typeof data.email === 'string') return data
    return null
  } catch {
    return null
  }
}

/** @param {SesionUsuario} sesion */
export function guardarSesion(sesion) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(sesion))
  window.dispatchEvent(new CustomEvent(SESSION_EVENT, { detail: sesion }))
}

export function cerrarSesion() {
  localStorage.removeItem(SESSION_KEY)
  window.dispatchEvent(new CustomEvent(SESSION_EVENT, { detail: null }))
}
