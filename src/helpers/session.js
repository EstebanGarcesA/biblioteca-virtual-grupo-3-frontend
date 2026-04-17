const SESSION_KEY = 'biblioteca_sesion_usuario'

/**
 * Sesión local sin tokens: datos mínimos del usuario tras login.
 * @typedef {{ id: number, email: string, rolDescripcion: string }} SesionUsuario
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
}

export function cerrarSesion() {
  localStorage.removeItem(SESSION_KEY)
}
