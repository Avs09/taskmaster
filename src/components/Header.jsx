import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">
          TaskMaster
        </h1>

        <nav>
          <Link
            to="/login"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
