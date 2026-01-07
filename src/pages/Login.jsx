// src/pages/Login.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


export default function Login() {
  const { signup, login, currentUser } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Si ya hay usuario logueado, redirige al home
  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true })
    }
  }, [currentUser, navigate])

  function friendlyErrorMessage(code, message) {
    // Mensajes simples y entendibles para el portafolio
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
    setError('')
    setLoading(true)
    try {
      if (isRegister) {
        await signup(email, password)
      } else {
        await login(email, password)
      }
      // al iniciar sesión, onAuthStateChanged en AuthContext hará la navegación automática por el useEffect
    } catch (err) {
      console.error('Auth error', err)
      setError(friendlyErrorMessage(err.code, err.message))
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800">{isRegister ? 'Registro' : 'Iniciar sesión'}</h2>

      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 rounded-md`}
        >
          {loading ? (isRegister ? 'Creando cuenta...' : 'Iniciando sesión...') : (isRegister ? 'Crear cuenta' : 'Entrar')}
        </button>
      </form>

      <div className="mt-4 text-sm text-center">
        <button
          onClick={() => { setIsRegister(!isRegister); setError('') }}
          className="text-blue-600 hover:underline"
          disabled={loading}
        >
          {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
        </button>
      </div>
    </div>
  )
}
