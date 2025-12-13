import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    if (user.role === "hradmin") navigate("/dashboard");
    else navigate("/dashboard/profile");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  const isAuthenticated = () => !!localStorage.getItem("token");

  return { login, logout, getUser, isAuthenticated };
}
