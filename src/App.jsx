import Header from './components/Header'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Mis tareas
        </h2>

        <p className="mt-2 text-gray-600">
          Aquí verás tus tareas cuando inicies sesión.
        </p>
      </main>
    </div>
  )
}

export default App
