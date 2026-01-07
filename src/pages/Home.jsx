
import { useMemo } from 'react'
import { useAuth } from '../contexts/AuthContext'
import useTasks from '../hooks/useTasks'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

export default function Home() {
  const { currentUser } = useAuth()
  const uid = currentUser?.uid
  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks(uid)

  const stats = useMemo(() => {
    const total = tasks?.length || 0
    const done = tasks?.filter(t => t.completed).length || 0
    return { total, done }
  }, [tasks])

  const allCompleted = stats.total > 0 && stats.done === stats.total

  async function handleAdd(title) {
    try {
      await addTask(title)
    } catch (err) {
      console.error('addTask error', err)
    }
  }

  async function handleToggle(task) {
    try {
      await toggleTask(task)
    } catch (err) {
      console.error('toggleTask error', err)
    }
  }

  async function handleDelete(task) {
  try {
    await deleteTask(task)
  } catch (err) {
    console.error('deleteTask error', err)
  }
}


  return (
    <section className="max-w-2xl mx-auto">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-slate-900">
          Tus tareas
        </h1>
        <p className="mt-1 text-slate-500 text-sm">
          Mantén el foco en lo importante.
        </p>
      </header>

      {/* Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        {/* Stats */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-medium text-slate-900">
              Lista personal
            </h2>
            <p className="text-xs text-slate-500">
              Progreso del día
            </p>
          </div>

          <div className="text-xs text-slate-600">
            <span className="font-semibold text-slate-900">
              {stats.done}
            </span>{' '}
            de {stats.total}
          </div>
        </div>

        {/* Form */}
        <TaskForm onAdd={handleAdd} />

{loading ? (
  <div className="py-8 text-center text-sm text-slate-500">
    Cargando tareas…
  </div>
) : (
  <>
    {allCompleted && (
      <div className="mb-6 text-center">
        <p className="text-sm font-medium text-emerald-700">
          🎉 ¡Todo listo!
        </p>
        <p className="text-xs text-emerald-600 mt-1">
          Has completado todas tus tareas.
        </p>
      </div>
    )}

    <TaskList
      tasks={tasks}
      onToggle={handleToggle}
      onDelete={handleDelete}
    />
  </>
)}


      </div>
    </section>
  )
}
