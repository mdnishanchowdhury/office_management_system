import React, { useState } from "react";
import Swal from "sweetalert2";

const initialState = {
    grade_id: "",
    department_id: "",
    designation_id: "",
    skills: [],
};

const PredictedSalary = () => {
    const [employee, setEmployee] = useState(initialState);

    const inputClass =
        "w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddSkill = (e) => {
        const value = e.target.value;

        if (value && !employee.skills.includes(value)) {
            setEmployee((prev) => ({
                ...prev,
                skills: [...prev.skills, value],
            }));
        }

        e.target.value = "";
    };

    const handleRemoveSkill = (skill) => {
        setEmployee((prev) => ({
            ...prev,
            skills: prev.skills.filter((s) => s !== skill),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Submitted Data:", employee);

        Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Salary prediction data submitted successfully.",
        });

        setEmployee(initialState);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-start py-12 px-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Predicted Salary
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Grade */}
                    <select
                        name="grade_id"
                        value={employee.grade_id}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    >
                        <option value="">Select Grade</option>
                        <option value="1">Grade 1</option>
                        <option value="2">Grade 2</option>
                        <option value="3">Grade 3</option>
                    </select>

                    {/* Department */}
                    <select
                        name="department_id"
                        value={employee.department_id}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    >
                        <option value="">Select Department</option>
                        <option value="1">HR</option>
                        <option value="2">IT</option>
                        <option value="3">Accounts</option>
                    </select>

                    {/* Designation */}
                    <select
                        name="designation_id"
                        value={employee.designation_id}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    >
                        <option value="">Select Designation</option>
                        <option value="1">Junior Developer</option>
                        <option value="2">Senior Developer</option>
                        <option value="3">Manager</option>
                    </select>

                    {/* Skill select (one by one) */}
                    <select
                        onChange={handleAddSkill}
                        className={inputClass}
                    >
                        <option value="">Select Skill</option>
                        <option value="1">React</option>
                        <option value="2">Node.js</option>
                        <option value="3">Python</option>
                        <option value="4">Django</option>
                    </select>

                    {/* Selected Skills */}
                    <div className="flex flex-wrap gap-2">
                        {employee.skills.map((skill) => (
                            <span
                                key={skill}
                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
                            >
                                Skill {skill}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSkill(skill)}
                                    className="text-red-500 font-bold"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
                    >
                        Predict Salary
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PredictedSalary;
