import { Navigate } from "react-router-dom";
import { useAuth } from "../../../Hooks/auth";

const DashboardRedirect = () => {
  const { getUser } = useAuth();
  const user = getUser();

  if (!user) return <Navigate to="/login" />;

  if (user.role === "hradmin") return <Navigate to="/dashboard/hr" />;
  if (user.role === "employee") return <Navigate to="/dashboard/profile" />;

  return <Navigate to="/login" />;
};

export default DashboardRedirect;
