import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SingleView from "./SingleView";
import EmployeeEdit from "./employeeEdit";

const AllEmployees = () => {
  const token = localStorage.getItem("token");
  const [employees, setEmployees] = useState([]);

  // Fetch all employees and filter active only
  const fetchEmployees = () => {
    if (!token) return;

    fetch("http://127.0.0.1:8000/api/employees/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const activeEmployees = Array.isArray(data)
          ? data.filter((emp) => emp.status === "active")
          : [];
        setEmployees(activeEmployees);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, [token]);

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://127.0.0.1:8000/api/employees/${id}/`, {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.status === 204) {
              Swal.fire("Deleted!", "Employee has been deleted.", "success");
              fetchEmployees();
            } else {
              Swal.fire("Error", "Failed to delete employee.", "error");
            }
          })
          .catch((err) => Swal.fire("Error", "Failed to delete employee.", "error"));
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl bg-white shadow-lg rounded-xl p-5 font-extrabold mb-4 text-center text-gray-800">
        Active Employees
      </h2>

      <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-100">
            <tr className="text-gray-700 font-semibold">
              <th className="px-4 py-3 border-b">Employee ID</th>
              <th className="px-4 py-3 border-b">Email</th>
              <th className="px-4 py-3 border-b">Department</th>
              <th className="px-4 py-3 border-b">Position</th>
              <th className="px-4 py-3 border-b">Salary</th>
              <th className="px-4 py-3 border-b">Status</th>
              <th className="px-4 py-3 border-b">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-5 text-gray-500">
                  No active employees found.
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition border-b">
                  <td className="px-4 py-3">{emp.employee_id}</td>
                  <td className="px-4 py-3">{emp.email}</td>
                  <td className="px-4 py-3">{emp.department}</td>
                  <td className="px-4 py-3">{emp.position}</td>
                  <td className="px-4 py-3">{emp.salary ?? "—"}</td>
                  <td className="px-4 py-3 capitalize">{emp.status}</td>

                  <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                    <SingleView emp={emp} />
                    <EmployeeEdit emp={emp} onUpdate={fetchEmployees} />
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AllEmployees;
