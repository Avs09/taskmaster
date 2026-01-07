import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Header() {
  const { currentUser, logout } = useAuth()

  async function handleLogout() {
    try {
      await logout()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200">
  <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
    <Link to="/" className="text-lg font-semibold text-gray-900 tracking-tight">
      TaskMaster
    </Link>

    <nav>
      {currentUser ? (
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-red-600 transition"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="text-sm text-gray-500 hover:text-blue-600 transition"
        >
          Login
        </Link>
      )}
    </nav>
  </div>
</header>


  )
}

export default Header
