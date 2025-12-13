import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 pl-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white tracking-wide">Office Management</h3>
          <p className="text-gray-400">
            Simplifying HR and office operations with modern tools. Manage employees, leaves, and resignations efficiently.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full hover:scale-110 transition-transform text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-blue-400 to-teal-500 rounded-full hover:scale-110 transition-transform text-white">
              <FaTwitter />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-blue-700 to-blue-500 rounded-full hover:scale-110 transition-transform text-white">
              <FaLinkedinIn />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-red-500 to-pink-500 rounded-full hover:scale-110 transition-transform text-white">
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link className="hover:text-white transition-colors" to="/">Home</Link>
            </li>
            <li>
              <Link className="hover:text-white transition-colors" to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link className="hover:text-white transition-colors" to="/dashboard/addEmployee">Add Employee</Link>
            </li>
            <li>
              <Link className="hover:text-white transition-colors" to="/dashboard/allEmployee">All Employees</Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Contact Us</h3>
          <p>Email: <a href="mailto:info@office-management.com" className="text-blue-400 hover:underline">info@office-management.com</a></p>
          <p>Phone: <span className="text-gray-400">+880 1234 567890</span></p>
          <p>Address: <span className="text-gray-400">Dhaka, Bangladesh</span></p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Office Management System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
