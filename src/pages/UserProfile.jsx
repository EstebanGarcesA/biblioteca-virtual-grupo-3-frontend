import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { end_points } from '../config/endPoints'
import { obtenerSesion, cerrarSesion } from '../helpers/session'
import './UserProfile.css'

const UserProfile = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const session = obtenerSesion()

  useEffect(() => {
    if (!session) {
      navigate('/login')
      return
    }

    let cancelled = false
    const loadProfile = async () => {
      try {
        const resUsuarios = await fetch(end_points.usuarios)
        if (!resUsuarios.ok) {
          throw new Error('No se pudo cargar la información del usuario.')
        }

        const usuariosData = await resUsuarios.json()
        const usuarios = Array.isArray(usuariosData)
          ? usuariosData
          : usuariosData?.usuarios ?? usuariosData?.content ?? []

        const currentUser = usuarios.find((item) => item.id === session.id)
        if (!currentUser) {
          setProfile({
            email: session.email,
            rolDescripcion: session.rolDescripcion,
          })
          return
        }

        const perfilId = currentUser.perfilId ?? currentUser.perfil?.id
        if (!perfilId) {
          setProfile({
            email: session.email,
            rolDescripcion: session.rolDescripcion,
            ...currentUser,
          })
          return
        }

        const resPerfil = await fetch(`${end_points.perfiles}/${perfilId}`)
        if (!resPerfil.ok) {
          setProfile({
            email: session.email,
            rolDescripcion: session.rolDescripcion,
            ...currentUser,
          })
          return
        }

        const perfilData = await resPerfil.json()
        if (!cancelled) {
          setProfile({
            email: session.email,
            rolDescripcion: session.rolDescripcion,
            ...perfilData,
            ...currentUser,
          })
        }
      } catch (error) {
        console.error(error)
        if (!cancelled) {
          setProfile({
            email: session.email,
            rolDescripcion: session.rolDescripcion,
          })
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadProfile()
    return () => {
      cancelled = true
    }
  }, [navigate, session])

  if (!session) return null

  const handleLogout = () => {
    cerrarSesion()
    navigate('/login')
  }

  const nombreCompleto = profile?.nombre
    ? `${profile.nombre} ${profile.apellido ?? ''}`.trim()
    : profile?.firstName
    ? `${profile.firstName} ${profile.lastName ?? ''}`.trim()
    : profile?.email

  return (
    <div className="perfil-page min-vh-100 d-flex flex-column">
      <div id="bannerPerfil" className="text-white px-4">
        <div className="container py-5">
          <h1>Mi perfil</h1>
          <p>Revisa tu información de usuario y acceso.</p>
        </div>
      </div>

      <main className="container py-5 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>Bienvenido, {nombreCompleto || 'usuario'}</h2>
            <p className="text-muted mb-0">Rol: {profile?.rolDescripcion ?? 'No disponible'}</p>
          </div>
          <div className="d-flex gap-2">
            <Link to="/" className="btn btn-outline-dark">
              Inicio
            </Link>
            <button type="button" className="btn btn-dark" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>

        <article className="perfil mb-5">
          <div className="imagen me-4 mb-4">
            <img
              src="https://images.unsplash.com/photo-1573497019438-7a9b3df5ad08?auto=format&fit=crop&w=400&q=80"
              alt="Foto de perfil"
            />
          </div>
          <div>
            <h2>Información personal</h2>
            <div className="informacion d-flex flex-wrap gap-4 mt-4">
              <ul>
                <li>ID: {profile?.id ?? '-'}</li>
                <li>Correo: {profile?.email ?? '-'}</li>
                <li>Documento: {profile?.tipoDocumento ?? profile?.documentType ?? '-'}</li>
                <li>Número: {profile?.numeroDocumento ?? profile?.documentNumber ?? '-'}</li>
              </ul>
              <ul>
                <li>Nombre: {profile?.nombre ?? profile?.firstName ?? '-'}</li>
                <li>Apellido: {profile?.apellido ?? profile?.lastName ?? '-'}</li>
                <li>Dirección: {profile?.direccion ?? profile?.address ?? '-'}</li>
                <li>Teléfono: {profile?.telefono ?? profile?.phone ?? '-'}</li>
              </ul>
            </div>
          </div>
        </article>

        <section id="informacionUsuario" className="p-4 rounded mb-5 text-white">
          <div className="row gy-3">
            <div className="col-md-4">
              <div className="p-3 bg-white bg-opacity-10 rounded">
                <h3>Sesión</h3>
                <p>{profile?.email ?? session.email}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-white bg-opacity-10 rounded">
                <h3>Rol</h3>
                <p>{profile?.rolDescripcion ?? session.rolDescripcion}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-white bg-opacity-10 rounded">
                <h3>Estado</h3>
                <p>{loading ? 'Cargando...' : 'Activo'}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="tablePrestamo">
          <h3 className="mb-3">Préstamos recientes</h3>
          <div className="table-responsive rounded bg-white shadow-sm p-3">
            <table className="table table-borderless mb-0">
              <thead>
                <tr>
                  <th>Libro</th>
                  <th>Fecha préstamo</th>
                  <th>Fecha devolución</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>El principito</td>
                  <td>01/04/2026</td>
                  <td>15/04/2026</td>
                  <td>Devuelto</td>
                </tr>
                <tr>
                  <td>Cien años de soledad</td>
                  <td>10/04/2026</td>
                  <td>25/04/2026</td>
                  <td>En préstamo</td>
                </tr>
                <tr>
                  <td>1984</td>
                  <td>13/04/2026</td>
                  <td>28/04/2026</td>
                  <td>Pendiente</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default UserProfile
