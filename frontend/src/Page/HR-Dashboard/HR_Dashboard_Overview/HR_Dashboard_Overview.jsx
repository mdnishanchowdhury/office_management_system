import React from "react";
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

const HR_Dashboard_Overview = () => {
  // 📊 Dummy Data for Charts
  const departmentData = [
    { department: "IT", employees: 40 },
    { department: "HR", employees: 15 },
    { department: "Finance", employees: 20 },
    { department: "Sales", employees: 35 },
    { department: "Admin", employees: 10 },
  ];

  const hiringTrend = [
    { month: "Jan", hired: 4 },
    { month: "Feb", hired: 2 },
    { month: "Mar", hired: 6 },
    { month: "Apr", hired: 3 },
    { month: "May", hired: 5 },
    { month: "Jun", hired: 7 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        HR Dashboard Overview
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600">Total Employees</h3>
          <p className="text-4xl font-bold mt-2">120</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600">On Leave Today</h3>
          <p className="text-4xl font-bold mt-2">8</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600">New Joiners</h3>
          <p className="text-4xl font-bold mt-2">3</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600">Resignations</h3>
          <p className="text-4xl font-bold mt-2">2</p>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Department-wise Employees Bar Chart */}
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

        {/* Monthly Hiring Trend Line Chart */}
        <div className="bg-white rounded-xl shadow p-6 h-80">
          <h2 className="text-lg font-semibold mb-4">
            📈 Monthly Hiring & Resignation Trend
          </h2>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hiringTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="hired"
                stroke="#10b981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Employee Table */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Recently Added Employees</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3">Name</th>
              <th className="p-3">Department</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-3">John Doe</td>
              <td className="p-3">IT</td>
              <td className="p-3 text-green-600">Active</td>
              <td className="p-3">
                <button className="px-3 py-1 bg-blue-500 text-white rounded">
                  View
                </button>
              </td>
            </tr>

            <tr className="border-b">
              <td className="p-3">Sara Khan</td>
              <td className="p-3">HR</td>
              <td className="p-3 text-yellow-600">On Leave</td>
              <td className="p-3">
                <button className="px-3 py-1 bg-blue-500 text-white rounded">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Leave Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Employees on Leave</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3">Employee</th>
              <th className="p-3">Leave Type</th>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-3">Asif Ahmed</td>
              <td className="p-3">Sick Leave</td>
              <td className="p-3">2025-12-01</td>
              <td className="p-3">2025-12-03</td>
              <td className="p-3 text-red-500">Approved</td>
            </tr>

            <tr className="border-b">
              <td className="p-3">Maliha Sultana</td>
              <td className="p-3">Casual Leave</td>
              <td className="p-3">2025-12-02</td>
              <td className="p-3">2025-12-02</td>
              <td className="p-3 text-red-500">Approved</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HR_Dashboard_Overview;
