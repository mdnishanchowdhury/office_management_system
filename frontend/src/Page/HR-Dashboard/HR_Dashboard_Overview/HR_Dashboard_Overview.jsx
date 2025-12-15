import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import SingleView from "../All_Employees/SingleView";

const HR_Dashboard_Overview = () => {
  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem("token");

  /* ================= FETCH EMPLOYEES ================= */
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/employees/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // ✅ Handle DRF pagination + normal array
        if (Array.isArray(data)) {
          setEmployees(data);
        } else if (Array.isArray(data?.results)) {
          setEmployees(data.results);
        } else {
          setEmployees([]);
        }
      })
      .catch(() => setEmployees([]));
  }, [token]);

  /* ================= SAFE FILTERS ================= */
  const resignedEmployees = Array.isArray(employees)
    ? employees.filter((emp) => emp.status === "resigned")
    : [];

  const leftEmployees = Array.isArray(employees)
    ? employees.filter((emp) => emp.status === "inactive")
    : [];

  /* ================= DEPARTMENT COUNT ================= */
  const departmentCount = Array.isArray(employees)
    ? employees.reduce((acc, emp) => {
        const dept = emp.department || "Unknown";
        acc[dept] = (acc[dept] || 0) + 1;
        return acc;
      }, {})
    : {};

  const departmentData = Object.entries(departmentCount).map(
    ([department, employees]) => ({
      department,
      employees,
    })
  );

  /* ================= MONTHLY DATA ================= */
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const monthlyResignations = months.map((month) => ({
    month,
    resigned: 0,
  }));

  Array.isArray(employees) &&
    employees.forEach((emp) => {
      if (emp.status === "resigned" && emp.updated_at) {
        const m = new Date(emp.updated_at).getMonth();
        if (!isNaN(m)) {
          monthlyResignations[m].resigned += 1;
        }
      }
    });

  const hiringTrend = months.map((month, index) => ({
    month,
    hired: Array.isArray(employees)
      ? employees.filter(
          (emp) =>
            emp.hire_date &&
            new Date(emp.hire_date).getMonth() === index
        ).length
      : 0,
    resigned: monthlyResignations[index].resigned,
  }));

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        HR Dashboard Overview
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600">Total Employees</h3>
          <p className="text-4xl font-bold mt-2">{employees.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600">Resignation Requests</h3>
          <p className="text-4xl font-bold mt-2">
            {resignedEmployees.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600">Employees on Leave</h3>
          <p className="text-4xl font-bold mt-2">
            {leftEmployees.length}
          </p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Department Chart */}
        <div className="bg-white rounded-xl shadow p-6 h-80">
          <h2 className="text-lg font-semibold mb-4">
            📊 Employee Department Chart
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="employees" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hiring vs Resignation */}
        <div className="bg-white rounded-xl shadow p-6 h-80">
          <h2 className="text-lg font-semibold mb-4">
            📈 Hiring & Resignation Trend
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hiringTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="hired" stroke="#10b981" strokeWidth={3} />
              <Line type="monotone" dataKey="resigned" stroke="#ef4444" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RESIGNED TABLE */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Employees Resignation Requests
        </h2>
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3">Name</th>
              <th className="p-3">Department</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {resignedEmployees.map((emp) => (
              <tr key={emp.id} className="border-b">
                <td className="p-3">{emp.first_name} {emp.last_name}</td>
                <td className="p-3">{emp.department}</td>
                <td className="p-3 text-red-600">{emp.status}</td>
                <td className="p-3">
                  <SingleView emp={emp} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* INACTIVE TABLE */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Employees on Leave
        </h2>
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3">Name</th>
              <th className="p-3">Department</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {leftEmployees.map((emp) => (
              <tr key={emp.id} className="border-b">
                <td className="p-3">{emp.first_name} {emp.last_name}</td>
                <td className="p-3">{emp.department}</td>
                <td className="p-3 text-yellow-600">{emp.status}</td>
                <td className="p-3">
                  <SingleView emp={emp} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HR_Dashboard_Overview;
