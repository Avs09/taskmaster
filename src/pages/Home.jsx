import { useAuth } from '../contexts/AuthContext'
import useTasks from '../hooks/useTasks'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

function Home() {
  const { currentUser } = useAuth()
  const uid = currentUser?.uid
  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks(uid)

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
    if (!confirm('¿Eliminar tarea?')) return
    try {
      await deleteTask(task)
    } catch (err) {
      console.error('deleteTask error', err)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900">Mis tareas</h2>
        <p className="mt-1 text-gray-500">Organiza tu día, una tarea a la vez.</p>
      </div>

      <TaskForm onAdd={handleAdd} />

      {loading ? (
        <p className="text-gray-600">Cargando tareas...</p>
      ) : (
        <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
      )}
    </div>
  )
}

export default Home
