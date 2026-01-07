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
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        className="flex-1 border rounded px-3 py-2"
        placeholder="Nueva tarea..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
        Añadir
      </button>
    </form>
  )
}

export default TaskForm
