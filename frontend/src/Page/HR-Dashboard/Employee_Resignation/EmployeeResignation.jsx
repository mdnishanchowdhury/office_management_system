import React, { useState } from "react";

const EmployeeResignation = () => {
  const [resignations] = useState([
    {
      id: 1,
      employeeId: 101,
      name: "John Doe",
      department: "IT",
      designation: "Software Engineer",
      resignationDate: "2025-11-30",
      reason: "Personal reasons",
      status: "Pending"
    },
    {
      id: 2,
      employeeId: 102,
      name: "Jane Smith",
      department: "HR",
      designation: "HR Manager",
      resignationDate: "2025-12-05",
      reason: "Better opportunity",
      status: "Approved"
    }
  ]);

  const [viewResignation, setViewResignation] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Employee Resignations
      </h2>

      {/* Resignation Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border-b">ID</th>
              <th className="px-4 py-3 border-b">Name</th>
              <th className="px-4 py-3 border-b">Department</th>
              <th className="px-4 py-3 border-b">Designation</th>
              <th className="px-4 py-3 border-b">Resignation Date</th>
              <th className="px-4 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resignations.map(res => (
              <tr key={res.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border">{res.employeeId}</td>
                <td className="px-4 py-2 border">{res.name}</td>
                <td className="px-4 py-2 border">{res.department}</td>
                <td className="px-4 py-2 border">{res.designation}</td>
                <td className="px-4 py-2 border">{res.resignationDate}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => setViewResignation(res)}
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

      {/* View Resignation Modal */}
      {viewResignation && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Resignation Details</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Employee ID:</strong> {viewResignation.employeeId}</p>
              <p><strong>Name:</strong> {viewResignation.name}</p>
              <p><strong>Department:</strong> {viewResignation.department}</p>
              <p><strong>Designation:</strong> {viewResignation.designation}</p>
              <p><strong>Resignation Date:</strong> {viewResignation.resignationDate}</p>
              <p><strong>Reason:</strong> {viewResignation.reason}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    viewResignation.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {viewResignation.status}
                </span>
              </p>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setViewResignation(null)}
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

export default EmployeeResignation;
