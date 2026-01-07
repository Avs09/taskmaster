function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No tienes tareas aún. Disfruta el momento ✨
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {tasks.map(task => (
        <li
          key={task.id}
          className="bg-white px-4 py-3 rounded-lg shadow-sm flex justify-between items-center hover:shadow transition"
        >
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task)}
              className="w-4 h-4 accent-blue-600"
            />

            <span
              className={`text-gray-800 ${
                task.completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {task.title}
            </span>
          </label>

          <button
            onClick={() => onDelete(task)}
            className="text-xs text-gray-400 hover:text-red-600 transition"
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TaskList
