
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { signup, login, currentUser } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('') // success or error shown visually and to screen readers

  // si ya hay usuario logueado, redirige al home
  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true })
    }
  }, [currentUser, navigate])

  function friendlyErrorMessage(code, message) {
    if (!code) return message || 'Ocurrió un error'
    if (code.includes('auth/email-already-in-use')) return 'El email ya está en uso.'
    if (code.includes('auth/invalid-email')) return 'Email inválido.'
    if (code.includes('auth/weak-password')) return 'La contraseña es muy débil (mínimo 6 caracteres).'
    if (code.includes('auth/wrong-password')) return 'Contraseña incorrecta.'
    if (code.includes('auth/user-not-found')) return 'No existe una cuenta con ese email.'
    return message || code
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      if (isRegister) {
        await signup(email, password)
        setMessage('Cuenta creada')
      } else {
        await login(email, password)
        setMessage('Has iniciado sesión')
      }
      // la redirección la hace el useEffect por currentUser
    } catch (err) {
      console.error('Auth error', err)
      setMessage(friendlyErrorMessage(err.code, err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

        <h2 className="text-xl font-semibold text-slate-900 text-center">
          {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
        </h2>

        <p className="text-sm text-slate-500 text-center mt-2">
          {isRegister ? 'Regístrate para guardar tus tareas en la nube.' : 'Accede para ver y gestionar tus tareas.'}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" aria-live="polite">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              autoFocus
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="tucorreo@ejemplo.com"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Contraseña</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {message && (
            <div
              role="status"
              className={`text-sm px-3 py-2 rounded-md ${message.toLowerCase().includes('error') || message.toLowerCase().includes('incorrecta') || message.toLowerCase().includes('no existe') ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white text-sm font-medium transition-shadow ${
              loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800 shadow-sm'
            }`}
            aria-busy={loading}
          >
            {loading ? (isRegister ? 'Creando...' : 'Iniciando...') : (isRegister ? 'Crear cuenta' : 'Entrar')}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <button
            onClick={() => { setIsRegister(!isRegister); setMessage('') }}
            className="text-slate-600 hover:text-slate-900 transition"
            disabled={loading}
          >
            {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
      </section>
    </main>
  )
}
