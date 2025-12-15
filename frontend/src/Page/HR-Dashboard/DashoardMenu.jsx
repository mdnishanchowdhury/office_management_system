import { Link, useLocation } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaUserPlus, FaUsers, FaChartLine } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdEventNote } from "react-icons/md";
import { useAuth } from "../../Hooks/auth";
import useLogout from "../../Hooks/useLogout";

const DashboardMenu = ({ onLinkClick }) => {
  const location = useLocation();
  const base = "/dashboard";
  const handleLogOut = useLogout();
  const { getUser } = useAuth();
  const user = getUser();

  const isAdmin = user?.role === "hradmin";

  const menuItems = isAdmin
    ? [
      { path: "/", label: "Home", icon: <FaHome /> },
      { path: base, label: "Dashboard", icon: <FaChartLine /> },
      // { path: `${base}`, label: "Dashboard", icon: <FaUserPlus /> },
      { path: `${base}/addEmployee`, label: "New Employee", icon: <FaUserPlus /> },
      { path: `${base}/predictedsalary`, label: "Predicted Salary", icon: <FaUserPlus /> },
      { path: `${base}/allEmployee`, label: "All Employee", icon: <FaUsers /> },
      { path: `${base}/resignedPage`, label: "Employee Resignation Req", icon: <IoDocumentTextOutline /> },
      { path: `${base}/employeeLeftPage`, label: "Employee Resignation List", icon: <MdEventNote /> },
      { path: `${base}/powerbl`, label: "PowerBI Dashboard", icon: <MdEventNote /> },
    ]
    : [
      { path: "/", label: "Home", icon: <FaHome /> },
      { path: "/dashboard/profile", label: "Profile", icon: <FaUsers /> },
    ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-green-400 font-bold text-lg">Office Dashboard</h2>
      </div>

      {/* Scrollable Menu */}
      <ul className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
        {menuItems.map(({ path, label, icon, subMenu }) => {
          const isActive =
            location.pathname === path ||
            (subMenu && subMenu.some((item) => item.path === location.pathname));

          return (
            <li key={path}>
              <Link
                to={path}
                onClick={onLinkClick}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                  ${isActive
                    ? "bg-gray-700 text-white font-semibold"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
              >
                <span className="text-lg">{icon}</span>
                <span>{label}</span>
              </Link>

              {/* Sub Menu */}
              {subMenu && (
                <ul className="pl-8 mt-1 space-y-1">
                  {subMenu.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={onLinkClick}
                        className={`block px-3 py-1 rounded-lg text-sm
                          ${location.pathname === item.path
                            ? "bg-gray-700 text-white"
                            : "text-gray-400 hover:bg-gray-700 hover:text-white"
                          }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      {/* Logout Button Fixed at Bottom */}
      <div className="p-3 border-t border-gray-700 mt-auto">
        <button
          onClick={handleLogOut}
          className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium
          bg-red-500 hover:bg-red-600 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardMenu;
