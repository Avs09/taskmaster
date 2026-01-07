function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">
          TaskMaster
        </h1>

        <nav>
          <button className="text-sm font-medium text-blue-600 hover:underline">
            Login
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
