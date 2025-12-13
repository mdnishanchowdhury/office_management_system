import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const Profile = () => {
    const [employee, setEmployee] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/profile/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setEmployee(data));
    }, [token]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const updateData = {
            phone: employee.phone,
            address: employee.address,
        };

        fetch("http://127.0.0.1:8000/api/profile/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(updateData),
        })
            .then((res) => res.json())
            .then((result) => {
                setEmployee(result);

                Swal.fire({
                    title: "Updated!",
                    text: "Profile updated successfully.",
                    icon: "success",
                    confirmButtonColor: "#16a34a",
                });
            });
    };

    const { employee_id, first_name, last_name, phone, position, address, date_of_birth, department, email,
        role, gender, status,grade } = employee;
        console.log(employee)

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

                {/* Header */}
                <div className="flex items-center gap-6 border-b pb-6">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shadow-md">
                        {employee?.photo ? (
                            <img src={employee.photo} alt="profile" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-4xl font-bold text-gray-700">
                                {first_name?.charAt(0)}
                            </span>
                        )}
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {first_name} {last_name}
                        </h2>
                        <p className="text-green-600 text-sm font-medium">{position}</p>
                        <p className="text-gray-500 text-sm">Employee ID: {employee_id}</p>
                    </div>
                </div>

                {/* Details Section */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Personal Information */}
                    <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                            Personal Information
                        </h3>

                        <div className="mt-4 space-y-4 text-gray-600">
                            <p><strong>Email:</strong> {email}</p>

                            <div>
                                <label className="block font-medium">Phone:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={phone || ""}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-green-400"
                                />
                            </div>

                            <div>
                                <label className="block font-medium">Address:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={address || ""}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-green-400"
                                />
                            </div>

                            <p><strong>Birthday:</strong> {date_of_birth}</p>
                            <p><strong>Gender:</strong> {gender}</p>
                            <p><strong>Status:</strong> {status}</p>
                        </div>
                    </div>

                    {/* Job Details */}
                    <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                            Job Details
                        </h3>
                        <div className="mt-4 space-y-2 text-gray-600">
                            <p><strong>Department:</strong> {department}</p>
                            <p><strong>Role:</strong> {role}</p>
                            <p><strong>Grade:</strong> {grade}</p>
                        </div>
                    </div>
                </div>

                {/* Skills */}
                <div className="mt-8 bg-gray-50 p-5 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                        Skills
                    </h3>

                    <div className="mt-4 flex flex-wrap gap-3">
                        {employee.skills?.map((skill, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-6 text-right">
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                        Save Changes
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Profile;
