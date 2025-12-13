import React, { useState } from "react";
import Swal from "sweetalert2";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "",
    employee_id: "",
    password: "",
    phone: "",
    address: "",
    department: "",
    position: "",
    gender: "",
    salary: "",
    status: "active",
    hire_date: "",
    date_of_birth: "",
  });

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400";

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const payload = {
      ...employee,
      hire_date: employee.hire_date,
      date_of_birth: employee.date_of_birth,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/employees/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Employee Added!",
          text: "New employee created successfully.",
        });

        setEmployee({
          username: "",
          email: "",
          first_name: "",
          last_name: "",
          role: "",
          employee_id: "",
          password: "",
          phone: "",
          address: "",
          department: "",
          position: "",
          gender: "",
          salary: "",
          status: "active",
          hire_date: "",
          date_of_birth: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: JSON.stringify(data),
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Cannot connect to server",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add New Employee
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* FORM FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input name="username" placeholder="Username" value={employee.username}
              onChange={handleChange} className={inputClass} required />

            <input name="employee_id" placeholder="Employee ID" value={employee.employee_id}
              onChange={handleChange} className={inputClass} required />

            <input name="first_name" placeholder="First Name" value={employee.first_name}
              onChange={handleChange} className={inputClass} required />

            <input name="last_name" placeholder="Last Name" value={employee.last_name}
              onChange={handleChange} className={inputClass} required />

            <input type="email" name="email" placeholder="Email" value={employee.email}
              onChange={handleChange} className={inputClass} required />

            <input type="password" name="password" placeholder="Password"
              value={employee.password} onChange={handleChange} className={inputClass} required />

            <input name="phone" placeholder="Phone" value={employee.phone}
              onChange={handleChange} className={inputClass} required />

            <input name="address" placeholder="Address" value={employee.address}
              onChange={handleChange} className={inputClass} required />

            <input name="department" placeholder="Department" value={employee.department}
              onChange={handleChange} className={inputClass} required />

            <input name="position" placeholder="Position" value={employee.position}
              onChange={handleChange} className={inputClass} required />

            <select name="gender" value={employee.gender} onChange={handleChange}
              className={inputClass} required>
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              type="number"
              name="salary"
              placeholder="Salary"
              value={employee.salary}
              onChange={handleChange}
              className={inputClass}
            />



            <select name="status" value={employee.status} onChange={handleChange}
              className={inputClass}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select name="role" value={employee.role} onChange={handleChange}
              className={inputClass} required>
              <option value="">Select Role</option>
              <option value="hradmin">HR Admin</option>
              <option value="employee">Employee</option>
            </select>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Hire Date</label>
              <input type="date" name="hire_date" value={employee.hire_date}
                onChange={handleChange} className={inputClass} required />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Birth Date</label>
              <input type="date" name="date_of_birth" value={employee.date_of_birth}
                onChange={handleChange} className={inputClass} required />
            </div>

          </div>

          <button type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600">
            Add Employee
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
