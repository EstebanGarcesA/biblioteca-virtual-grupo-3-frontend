const CREDENTIALS_KEY = 'biblioteca_credenciales'

/**
 * @typedef {{ email: string, password: string }} Credenciales
 */

/** @returns {Credenciales | null} */
export function obtenerCredenciales() {
  try {
    const raw = sessionStorage.getItem(CREDENTIALS_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (data?.email && data?.password) {
      return { email: data.email, password: data.password }
    }
    return null
  } catch {
    return null
  }
}

/** @param {string} email @param {string} password */
export function guardarCredenciales(email, password) {
  sessionStorage.setItem(
    CREDENTIALS_KEY,
    JSON.stringify({ email: email.trim(), password }),
  )
}

export function limpiarCredenciales() {
  sessionStorage.removeItem(CREDENTIALS_KEY)
}

/** @param {Credenciales} [credenciales] */
export function buildAuthHeaders(credenciales) {
  const creds = credenciales ?? obtenerCredenciales()
  if (!creds?.email || creds.password == null) {
    return {}
  }
  const token = btoa(`${creds.email}:${creds.password}`)
  return { Authorization: `Basic ${token}` }
}
