import { IconTrash } from './Icons'
import { useState } from 'react'

export default function TaskList({ tasks = [], onToggle, onDelete }) {
    const [confirmingId, setConfirmingId] = useState(null)
    const [removingId, setRemovingId] = useState(null)

  if (!tasks || tasks.length === 0) {
    return (
      <div className="py-16 text-center text-slate-500">
        <p className="text-sm">
          No tienes tareas aún.
        </p>
        <p className="text-xs mt-1">
          Empieza añadiendo una arriba.
        </p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-slate-100">
      {tasks.map(task => (
        <li
  key={task.id}
  className={`group flex items-center justify-between py-3 px-3 rounded-lg transition-all
    ${task.completed
      ? 'bg-emerald-50'
      : 'hover:bg-slate-50'
    }
    ${removingId === task.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
    `}
>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={!!task.completed}
              onChange={() => onToggle(task)}
              className="w-4 h-4 accent-slate-900"
            />

           <span
  className={`text-sm transition-all ${
    task.completed
      ? 'line-through text-slate-400'
      : 'text-slate-800'
  }`}
>
              {task.title}
            </span>
          </label>

          {confirmingId === task.id ? (
  <div className="flex items-center gap-2 text-xs">
    <button
      onClick={() => {
    setRemovingId(task.id)
    setConfirmingId(null)

    setTimeout(() => {
      onDelete(task)
      setRemovingId(null)
    }, 200)
  }}
      className="px-2 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
    >
      Eliminar
    </button>

    <button
      onClick={() => setConfirmingId(null)}
      className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
    >
      Cancelar
    </button>
  </div>
) : (
  <button
    type="button"
    onClick={() => setConfirmingId(task.id)}
    className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-600 p-1"
    aria-label="Eliminar tarea"
    title="Eliminar"
  >
    <IconTrash className="w-4 h-4" />
  </button>
)}
        </li>
      ))}
    </ul>
  )
}
