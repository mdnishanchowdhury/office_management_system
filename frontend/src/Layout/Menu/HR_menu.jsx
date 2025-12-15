import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import DashboardMenu from "../../Page/HR-Dashboard/DashoardMenu";
// import DashboardMenu from "../../Page/HR-Dashboard/DashboardMenu";

function HR_menu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Mobile Top Navbar */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-gray-900 p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold uppercase text-green-400">
          Smart Hostel
        </h2>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <FaTimes className="w-6 h-6 text-green-400" />
          ) : (
            <FaBars className="w-6 h-6 text-green-400" />
          )}
        </button>
      </div>

      {/* Sidebar (FIXED) */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64
        bg-gradient-to-b from-gray-900 to-gray-800 text-white
        transform transition-transform duration-300
        ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <DashboardMenu onLinkClick={() => setMobileMenuOpen(false)} />
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content (ONLY THIS SCROLLS) */}
      <main
        className="
          md:ml-64
          mt-16 md:mt-0
          h-screen
          overflow-y-auto
          bg-gray-50
          p-4
        "
      >
        <Outlet />
      </main>
    </div>
  );
}

export default HR_menu;
