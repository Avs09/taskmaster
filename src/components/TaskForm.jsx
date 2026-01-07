import { useState } from 'react'

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    await onAdd(title.trim())
    setTitle('')
  }

  return (
    <form
  onSubmit={handleSubmit}
  className="mb-8 flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm"
>
  <input
    className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
    placeholder="Escribe una nueva tarea..."
    value={title}
    onChange={e => setTitle(e.target.value)}
  />

  <button
    className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
  >
    Añadir
  </button>
</form>

  )
}

export default TaskForm
