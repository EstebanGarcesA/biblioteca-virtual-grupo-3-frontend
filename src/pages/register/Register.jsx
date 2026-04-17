import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBook } from 'react-icons/fa'
import Footer from '../../components/Footer'
import { end_points } from '../../config/endPoints'
import { notifyApiResult, showError, showWarning } from '../../helpers/alerts'
import './Register.css'

const emptyForm = () => ({
  documentType: '',
  documentNumber: '',
  firstName: '',
  lastName: '',
  address: '',
  phone: '',
  email: '',
  password: '',
})

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [users, setUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const setField = (field) => (e) => {
    const value = e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        const response = await fetch(end_points.users)
        let data = {}
        try {
          data = await response.json()
        } catch {
          data = {}
        }
        if (!response.ok) {
          if (!cancelled) {
            setUsers([])
            await notifyApiResult(response, data)
          }
          return
        }
        if (cancelled) return
        const list = Array.isArray(data) ? data : data?.users ?? data?.content ?? []
        setUsers(Array.isArray(list) ? list : [])
      } catch (error) {
        console.error(error)
        if (!cancelled) {
          setUsers([])
          await showError(
            error instanceof Error ? error.message : 'Comprueba tu conexión e inténtalo de nuevo.',
            'Sin conexión',
          )
        }
      } finally {
        if (!cancelled) setLoadingUsers(false)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  function isFormComplete() {
    const f = form
    return (
      f.documentType &&
      f.documentNumber.trim() &&
      f.firstName.trim() &&
      f.lastName.trim() &&
      f.address.trim() &&
      f.phone.trim() &&
      f.email.trim() &&
      f.password
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isFormComplete()) {
      await showWarning('Completa todos los campos obligatorios antes de registrar.', 'Formulario incompleto')
      return
    }
    if (loadingUsers) {
      await showWarning('Espera a que termine la carga de datos e inténtalo de nuevo.', 'Cargando')
      return
    }

    const emailTrim = form.email.trim()
    const exists = users.some((u) => u.username === emailTrim)
    if (exists) {
      await showError('Ya existe un usuario con ese correo o nombre de usuario.', 'No se pudo registrar')
      return
    }

    const payload = {
      username: emailTrim,
      password: form.password,
      email: emailTrim,
      tipoDocumento: form.documentType,
      numeroDocumento: form.documentNumber.trim(),
      nombre: form.firstName.trim(),
      apellido: form.lastName.trim(),
      direccion: form.address.trim(),
      telefono: form.phone.trim(),
    }

    setSubmitting(true)
    try {
      const response = await fetch(end_points.users, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      let data = {}
      try {
        data = await response.json()
      } catch {
        data = {}
      }
      await notifyApiResult(response, data)
      if (response.ok) {
        setForm(emptyForm())
        navigate('/login')
      }
    } catch (error) {
      console.error(error)
      await showError(
        error instanceof Error ? error.message : 'No se pudo enviar el registro. Intenta más tarde.',
        'Error de red',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg border-bottom bg-light">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <FaBook className="me-2 text-info" size={40} aria-hidden />
            <span className="navbar-brand mb-0 h1">Biblioteca Virtual</span>
          </div>
          <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-outline-secondary">
              Iniciar sesión
            </Link>
            <Link to="/" className="btn btn-secondary">
              Regresar
            </Link>
          </div>
        </div>
      </nav>

      <div id="bannerRegistro" className="flex-grow-1">
        <div className="container mt-4 mb-4">
          <div className="register-container card shadow-sm p-4 rounded mx-auto bg-white">
            <h2 className="text-center mb-4">Registro de usuario</h2>
            {loadingUsers && <div className="text-muted small mb-3">Cargando datos…</div>}
            <form id="registroForm" onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="tipoDocumento" className="form-label">
                    Tipo de documento
                  </label>
                  <select
                    id="tipoDocumento"
                    className="form-select"
                    value={form.documentType}
                    onChange={setField('documentType')}
                    required
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="CC">Cédula de ciudadanía</option>
                    <option value="TI">Tarjeta de identidad</option>
                    <option value="CE">Cédula de extranjería</option>
                    <option value="PAS">Pasaporte</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="numeroDocumento" className="form-label">
                    Número de documento
                  </label>
                  <input
                    id="numeroDocumento"
                    type="text"
                    className="form-control"
                    value={form.documentNumber}
                    onChange={setField('documentNumber')}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    className="form-control"
                    value={form.firstName}
                    onChange={setField('firstName')}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="apellido" className="form-label">
                    Apellido
                  </label>
                  <input
                    id="apellido"
                    type="text"
                    className="form-control"
                    value={form.lastName}
                    onChange={setField('lastName')}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="direccion" className="form-label">
                  Dirección
                </label>
                <input
                  id="direccion"
                  type="text"
                  className="form-control"
                  value={form.address}
                  onChange={setField('address')}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="telefono" className="form-label">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  type="tel"
                  className="form-control"
                  value={form.phone}
                  onChange={setField('phone')}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  autoComplete="email"
                  value={form.email}
                  onChange={setField('email')}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={setField('password')}
                  required
                />
              </div>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-info" disabled={loadingUsers || submitting}>
                  {submitting ? 'Registrando…' : 'Registrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Register
