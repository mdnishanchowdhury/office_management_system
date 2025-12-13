import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SingleView from "./All_Employees/SingleView";

const EmployeeLeftPage = () => {
    const token = localStorage.getItem("token");
    const [employees, setEmployees] = useState([]);

    // Fetch resigned or inactive employees
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
                const leftEmployees = Array.isArray(data)
                    ? data.filter((emp) => emp.status === "inactive")
                    : [];
                setEmployees(leftEmployees);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchEmployees();
    }, [token]);

    // Handle status update
    const handleStatusChange = (empId, newStatus) => {
        if (!token) return;

        fetch(`http://127.0.0.1:8000/api/employees/${empId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify({ status: newStatus }),
        })
            .then((res) => res.json())
            .then(() => {
                Swal.fire({
                    title: "Updated!",
                    text: "Status updated successfully.",
                    icon: "success",
                });
                fetchEmployees();
            })
            .catch((err) => {
                Swal.fire({
                    title: "Error",
                    text: "Failed to update status.",
                    icon: "error",
                });
                console.error(err);
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h2 className="text-3xl bg-white shadow-lg rounded-xl p-5 font-extrabold mb-4 text-center text-gray-800">
                Employees Left
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
                            <th className="px-4 py-3 border-b">Update Status</th>
                            <th className="px-4 py-3 border-b">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-5 text-gray-500">
                                    No inactive or resigned employees found.
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

                                    <td className="px-4 py-3">
                                        <select
                                            value={emp.status}
                                            onChange={(e) => handleStatusChange(emp.id, e.target.value)}
                                            className="border px-2 py-1 rounded-md"
                                        >
                                            <option value="">Select</option>
                                            <option value="active">Joining</option>
                                        </select>
                                    </td>

                                    <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                                        <SingleView emp={emp} />
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

export default EmployeeLeftPage;
