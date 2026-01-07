import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


function RequireAuth({ children }) {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default RequireAuth
