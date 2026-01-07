import useAuth from '../hooks/useAuth'
import useTasks from '../hooks/useTasks'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

function Home() {
  const { currentUser } = useAuth()
  const { tasks, loading, addTask, toggleTask, deleteTask } =
    useTasks(currentUser.uid)

  async function handleAdd(title) {
    try {
      await addTask(title)
    } catch (err) {
      console.error(err)
    }
  }

  async function handleToggle(task) {
    try {
      await toggleTask(task)
    } catch (err) {
      console.error(err)
    }
  }

  async function handleDelete(task) {
    if (!confirm('¿Eliminar tarea?')) return
    try {
      await deleteTask(task)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Mis tareas
      </h2>

      <TaskForm onAdd={handleAdd} />

      {loading ? (
        <p>Cargando tareas...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default Home
