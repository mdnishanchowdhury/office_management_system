import React, { useState } from "react";

const EmployeeLeaveList = () => {
  const [leaves] = useState([
    {
      id: 1,
      employeeId: 101,
      name: "John Doe",
      department: "IT",
      designation: "Software Engineer",
      leaveType: "Sick Leave",
      startDate: "2025-12-01",
      endDate: "2025-12-03",
      reason: "Fever and rest",
      status: "Approved"
    },
    {
      id: 2,
      employeeId: 102,
      name: "Jane Smith",
      department: "HR",
      designation: "HR Manager",
      leaveType: "Casual Leave",
      startDate: "2025-12-02",
      endDate: "2025-12-04",
      reason: "Family function",
      status: "Pending"
    }
  ]);

  const [viewLeave, setViewLeave] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Employees on Leave
      </h2>

      {/* Leave Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border-b">ID</th>
              <th className="px-4 py-3 border-b">Name</th>
              <th className="px-4 py-3 border-b">Department</th>
              <th className="px-4 py-3 border-b">Designation</th>
              <th className="px-4 py-3 border-b">Leave Type</th>
              <th className="px-4 py-3 border-b">Start Date</th>
              <th className="px-4 py-3 border-b">End Date</th>
              <th className="px-4 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border">{leave.employeeId}</td>
                <td className="px-4 py-2 border">{leave.name}</td>
                <td className="px-4 py-2 border">{leave.department}</td>
                <td className="px-4 py-2 border">{leave.designation}</td>
                <td className="px-4 py-2 border">{leave.leaveType}</td>
                <td className="px-4 py-2 border">{leave.startDate}</td>
                <td className="px-4 py-2 border">{leave.endDate}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => setViewLeave(leave)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Leave Modal */}
      {viewLeave && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Leave Details</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Employee ID:</strong> {viewLeave.employeeId}</p>
              <p><strong>Name:</strong> {viewLeave.name}</p>
              <p><strong>Department:</strong> {viewLeave.department}</p>
              <p><strong>Designation:</strong> {viewLeave.designation}</p>
              <p><strong>Leave Type:</strong> {viewLeave.leaveType}</p>
              <p><strong>Start Date:</strong> {viewLeave.startDate}</p>
              <p><strong>End Date:</strong> {viewLeave.endDate}</p>
              <p><strong>Reason:</strong> {viewLeave.reason}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    viewLeave.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {viewLeave.status}
                </span>
              </p>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setViewLeave(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeLeaveList;
