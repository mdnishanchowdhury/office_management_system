import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaSignOutAlt,
  FaUserPlus,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdEventNote } from "react-icons/md";
import { useAuth } from "../../Hooks/auth";

const DashboardMenu = ({ onLinkClick }) => {
  const location = useLocation();
  const base = "/dashboard";

  const { getUser, logout } = useAuth();
  const user = getUser();

  const isAdmin = user?.role === "hradmin";
  const isEmployee = user?.role === "employee";

  const menuItems = isAdmin
    ? [
      { path: "/", label: "Home", icon: <FaHome /> },
      { path: `${base}`, label: "Dashboard", icon: <FaChartLine /> },
      { path: `${base}/addEmployee`, label: "New Employee", icon: <FaUserPlus /> },
      { path: `${base}/predictedsalary`, label: "Predicted Salary", icon: <FaUserPlus /> },
      { path: `${base}/allEmployee`, label: "All Employee", icon: <FaUsers /> },
      {path: `${base}/resignedPage`,label: "Employee Resignation Req",icon: <IoDocumentTextOutline />,},
      {path: `${base}/employeeLeftPage`,label: "Employee Resignation List",icon: <MdEventNote />,},
      {path: `${base}/powerbl`,label: "PowerBl Dashboard ",icon: <MdEventNote />,},
    ]
    : [
      { path: "/", label: "Home", icon: <FaHome /> },
      { path: "/dashboard/profile", label: "Profile", icon: <FaUsers /> },
      {
        path: `/dashboard/canteen`,
        label: "Canteen",
        icon: <FaChartLine />,
        subMenu: [
          { path: `/dashboard/canteen/menu`, label: "View Menu" },
          { path: `/dashboard/canteen/feedback`, label: "Feedback" },
          { path: `/dashboard/canteen/prices`, label: "Price List" },
        ],
      },
    ];

  return (
    <div className="flex flex-col h-full bg-gray-800 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-green-400 font-bold text-lg tracking-wide">
          Office Dashboard
        </h2>
      </div>

      {/* Menu Items */}
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
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${isActive
                    ? "bg-gray-700 text-white font-semibold"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
              >
                <span className="text-lg">{icon}</span>
                <span>{label}</span>
              </Link>

              {/* Submenu */}
              {subMenu && (
                <ul className="pl-8 mt-1 space-y-1">
                  {subMenu.map((item) => {
                    const isSubActive = location.pathname === item.path;
                    return (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          onClick={onLinkClick}
                          className={`block px-3 py-1 rounded-lg text-sm transition-all duration-300
                            ${isSubActive
                              ? "bg-gray-700 text-white font-semibold"
                              : "text-gray-400 hover:bg-gray-700 hover:text-white"
                            }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700 mt-auto">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white hover:text-white hover:bg-red-600 transition-all duration-300 w-full"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardMenu;
