function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="text-gray-600">No hay tareas todavía.</p>
  }

  return (
    <ul className="space-y-2">
      {tasks.map(task => (
        <li
          key={task.id}
          className="bg-white p-3 rounded shadow flex justify-between items-center"
        >
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task)}
            />
            <span className={task.completed ? 'line-through text-gray-400' : ''}>
              {task.title}
            </span>
          </label>

          <button
            onClick={() => onDelete(task)}
            className="text-red-600 text-sm hover:underline"
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TaskList
