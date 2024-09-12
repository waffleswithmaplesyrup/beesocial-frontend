import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
  condition: boolean,
  redirectTo: string,
  children: JSX.Element,
}

function ProtectedRoute({ condition, redirectTo, children}: ProtectedRouteProps) {
  return (
    condition ? 
    children
    :
    <Navigate to={redirectTo} replace />
  )
}

export default ProtectedRoute
