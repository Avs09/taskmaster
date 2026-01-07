import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


function RequireAuth({ children }) {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default RequireAuth
