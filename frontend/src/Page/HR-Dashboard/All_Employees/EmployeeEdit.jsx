import { useState } from "react";
import Swal from "sweetalert2";

function EmployeeEdit({ emp, onUpdate }) {
    const modalId = `edit_modal_${emp.id}`;

    const [formData, setFormData] = useState({
        first_name: emp.first_name,
        last_name: emp.last_name,
        email: emp.email,
        department: emp.department,
        position: emp.position,
        salary: emp.salary,
        phone: emp.phone,
        address: emp.address,
        status: emp.status,
        grade: emp.grade,
    });

    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "salary" ? Number(value) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://127.0.0.1:8000/api/employees/${emp.id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(formData),
        })
            .then(async (res) => {
                const contentType = res.headers.get("content-type");

                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Server returned HTML. Wrong API URL or 404 page.");
                }

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.detail || "Failed to update employee");
                }

                Swal.fire("Success", "Employee updated!", "success");

                if (typeof onUpdate === "function") {
                    onUpdate();
                }

                document.getElementById(modalId).close();
            })
    };

    return (
        <div className="inline-block">
            <button
                onClick={() => document.getElementById(modalId).showModal()}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition text-sm"
            >
                Edit
            </button>

            <dialog id={modalId} className="modal">
                <div className="modal-box max-w-3xl rounded-2xl p-6">

                    {/* Close Button */}
                    <form method="dialog">
                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() => document.getElementById(modalId).close()}
                        >
                            ✕
                        </button>
                    </form>

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6 mt-2">
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-semibold text-gray-600">
                            {emp.first_name?.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold capitalize">{emp.first_name} {emp.last_name}</h2>
                            <p className="text-green-600 capitalize">{emp.department}</p>
                            <p className="text-gray-500 text-sm">Employee ID: {emp.employee_id}</p>
                        </div>
                    </div>

                    <hr className="my-4" />

                    {/* Form Grid */}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input className="input input-bordered"
                            name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" />

                        <input className="input input-bordered"
                            name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" />

                        <input className="input input-bordered col-span-2"
                            name="email" value={formData.email} onChange={handleChange} placeholder="Email" />

                        <input className="input input-bordered"
                            name="department" value={formData.department} onChange={handleChange} placeholder="Department" />

                        <input className="input input-bordered"
                            name="position" value={formData.position} onChange={handleChange} placeholder="Position" />

                        <input className="input input-bordered"
                            type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" />

                        <input className="input input-bordered"
                            name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />

                        <input className="input input-bordered col-span-2"
                            name="address" value={formData.address} onChange={handleChange} placeholder="Address" />

                        <select name="status" value={formData.status} onChange={handleChange} className="select select-bordered">
                            <option value="active">Active</option>
                            <option value="inactive">Left</option>
                            <option value="resigned">Resigned</option>
                        </select>

                        <select name="grade" value={formData.grade} onChange={handleChange} className="select select-bordered">
                            <option value="grade1">Grade 1</option>
                            <option value="grade2">Grade 2</option>
                            <option value="grade3">Grade 3</option>
                        </select>

                        <button
                            type="submit"
                            className="mt-6 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition col-span-2"
                        >
                            Update Employee
                        </button>
                    </form>
                </div>
            </dialog>
        </div>
    );
}

export default EmployeeEdit;
