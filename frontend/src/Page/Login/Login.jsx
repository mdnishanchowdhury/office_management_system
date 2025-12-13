import { useState } from "react";
import { useAuth } from "../../Hooks/auth";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaUserTie } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "", role: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role) {
      alert("Please select a role!");
      return;
    }
    setLoading(true);

    const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.detail || "Login failed!");
      setLoading(false);
      return;
    }

    if (formData.role !== data.user.role) {
      alert(`You selected ${formData.role} but your account role is ${data.user.role}`);
      setLoading(false);
      return;
    }

    login(data.token, data.user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8  w-[450px]">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Username */}
          <div className="relative">
            <FaUser className="absolute top-4 left-3 text-gray-400" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full px-10 py-3 border rounded-xl"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-4 left-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-10 py-3 border rounded-xl"
            />
            <span
              className="absolute top-5 right-3 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Role */}
          <div className="relative">
            <FaUserTie className="absolute top-4 left-3 text-gray-400" />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-10 py-3 border rounded-xl"
            >
              <option value="">Select Role</option>
              <option value="hradmin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-xl"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
