
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { IconUser } from './Icons'

function initialsFromEmail(email = '') {
  const name = (email.split('@')[0] || '').replace(/[.\-_]/g, ' ')
  const parts = name.split(' ').filter(Boolean)
  if (parts.length === 0) return 'U'
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function Header() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await logout()
      navigate('/login')
    } catch (err) {
      console.error('logout error', err)
    }
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/70 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-md bg-slate-900 text-white shadow-sm"
            aria-hidden="true"
          >
            <span className="text-sm">📝</span>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-900 leading-tight">TaskMaster</div>
            <div className="text-xs text-slate-500">Tu espacio de productividad</div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              <div className="flex items-center gap-3 pr-2">
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-50 border border-slate-100 text-slate-700 text-sm shadow-sm"
                  title={currentUser.email}
                  aria-hidden="false"
                >
                  {initialsFromEmail(currentUser.email)}
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-medium text-slate-800 truncate" title={currentUser.email}>
                    {currentUser.email}
                  </div>
                  <div className="text-xs text-slate-500">Cuenta</div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200 text-sm text-slate-700 hover:shadow-md transition-shadow"
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
              >
                <IconUser className="w-4 h-4 text-slate-600" />
                <span>Cerrar</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 rounded-md text-sm text-slate-700 hover:text-slate-900 transition"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
