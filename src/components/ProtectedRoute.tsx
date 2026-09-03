import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { hasAccess } from '../storage'

export const ProtectedRoute = () => {
  const location = useLocation()
  if (hasAccess(window.localStorage)) return <Outlet />

  const destination = `${location.pathname}${location.search}`
  return <Navigate replace to={`/access?next=${encodeURIComponent(destination)}`} />
}
