import { Navigate } from "react-router-dom";
import { useAuth } from "../../Hooks/auth";

export function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, getUser } = useAuth();

  if (!isAuthenticated()) return <Navigate to="/login" replace />;

  const user = getUser();
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
