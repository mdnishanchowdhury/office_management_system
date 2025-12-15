import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";

const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "You are not logged in",
      });
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      if (res.ok) {
        logout(); // clear auth state + localStorage

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Logged Out",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Logout failed",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server error",
      });
    }
  };

  return handleLogout;
};

export default useLogout;
