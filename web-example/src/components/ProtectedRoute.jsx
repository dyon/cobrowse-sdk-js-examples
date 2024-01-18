import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!user) {
      navigate('/login' + location.search)
    }
  }, [navigate, user, location])

  return children
}

export default ProtectedRoute
