import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "../Hooks/auth";

function NavBar() {
  const { getUser, logout } = useAuth();
  const user = getUser();
  console.log(user)

  const activeClass = "text-yellow-400 font-bold";

  const links = <>
    <li><NavLink to='/' className={({ isActive }) => isActive ? activeClass : ""}>HOME</NavLink></li>
    <li><NavLink to='/about' className={({ isActive }) => isActive ? activeClass : ""}>ABOUT</NavLink></li>
    <li><NavLink to='/service' className={({ isActive }) => isActive ? activeClass : ""}>SERVICE</NavLink></li>
    <li><NavLink to='/contact' className={({ isActive }) => isActive ? activeClass : ""}>CONTACT</NavLink></li>
    {user && <li><NavLink to='/dashboard' className={({ isActive }) => isActive ? activeClass : ""}>DASHBOARD</NavLink></li>}
  </>;

  const handleLogOut = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({ icon: "warning", title: "Not logged in!" });
      return;
    }

    fetch("http://127.0.0.1:8000/api/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      }
    }).then(res => {
      if (res.ok) {
        logout();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Logged Out",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({ icon: "error", title: "Logout failed!" });
      }
    });
  };

  return (
    <div className="navbar fixed z-10 bg-[#15151580] text-white shadow-sm px-1 lg:px-20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <GiHamburgerMenu className="w-8 h-8" />
          </div>
          <ul tabIndex={0} className="menu menu-[16px] dropdown-content rounded-box z-1 mt-3 w-[400px] p-2 shadow bg-[#000000] text-xl font-medium text-center">
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl md:text-xl font-black">Office Management</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end gap-3">
        {user ? (
          <button onClick={handleLogOut} className="btn">Sign Out</button>
        ) : (
          <Link to='/login' className="btn">Login</Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
