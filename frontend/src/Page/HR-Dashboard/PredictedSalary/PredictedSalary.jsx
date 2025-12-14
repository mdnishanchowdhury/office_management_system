import React, { useState } from "react";
import Swal from "sweetalert2";

const initialState = {
  grade: "",
  department_id: "",
  designation_id: "",
  skills: [],
};

const PredictedSalary = () => {
  const [formData, setFormData] = useState(initialState);
  const [predictedSalary, setPredictedSalary] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (e) => {
    const value = e.target.value;
    if (value && !formData.skills.includes(value)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, value],
      }));
    }
    e.target.value = "";
  };

  const handleRemoveSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields are filled
    if (!formData.grade || !formData.department_id || !formData.designation_id) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all required fields.",
      });
      return;
    }

    if (formData.skills.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Skills Selected",
        text: "Please add at least one skill.",
      });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      // Prepare payload
      const payload = {
        grade: formData.grade,
        department_id: parseInt(formData.department_id),
        designation_id: parseInt(formData.designation_id),
        skills: formData.skills.join(","), // comma-separated string
      };

      console.log("Sending prediction request:", payload);

      const response = await fetch(
        "http://127.0.0.1:8000/api/predict-salary/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Token ${token}` : "",
          },
          body: JSON.stringify(payload),
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Prediction error:", errorData);
        throw new Error(errorData.error || "Failed to predict salary");
      }

      const data = await response.json();
      console.log("Predicted Salary Response:", data);

      // Store the predicted salary
      setPredictedSalary(data.predicted_salary);

      Swal.fire({
        icon: "success",
        title: "Salary Predicted!",
        html: `
          <div class="text-left">
            <p class="mb-2"><strong>Grade:</strong> ${formData.grade}</p>
            <p class="mb-2"><strong>Department ID:</strong> ${formData.department_id}</p>
            <p class="mb-2"><strong>Designation ID:</strong> ${formData.designation_id}</p>
            <p class="mb-2"><strong>Skills:</strong> ${formData.skills.join(", ")}</p>
            <hr class="my-3">
            <p class="text-xl font-bold text-green-600">
              Predicted Salary: ৳${parseFloat(data.predicted_salary).toLocaleString()}
            </p>
          </div>
        `,
        confirmButtonText: "Use this salary to add employee",
      });

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Prediction Failed",
        text: err.message || "Failed to predict salary. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialState);
    setPredictedSalary(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-3xl">
        {/* Main Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="mb-6 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Salary Predictor
            </h2>
            <p className="text-gray-600">
              Get AI-powered salary recommendations for new hires
            </p>
          </div>

          <div className="space-y-5">
            {/* Grade Selection */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Grade <span className="text-red-500">*</span>
              </label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">-- Select Grade --</option>
                <option value="1">Grade 1</option>
                <option value="2">Grade 2</option>
                <option value="3">Grade 3</option>
                <option value="4">Grade 4</option>
              </select>
            </div>

            {/* Department Selection */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">-- Select Department --</option>
                <option value="5">CSE (24)</option>
                <option value="39">IT (25)</option>
                <option value="6">HR (26)</option>
                <option value="7">Finance (27)</option>
                <option value="52">Marketing (28)</option>
                <option value="406">Sales (29)</option>
                <option value="207">Operations (30)</option>
              </select>
            </div>

            {/* Designation Selection */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Designation <span className="text-red-500">*</span>
              </label>
              <select
                name="designation_id"
                value={formData.designation_id}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">-- Select Designation --</option>
                <option value="60">Software Engineer</option>
                <option value="125">Senior Engineer</option>
                <option value="124">Team Lead</option>
                <option value="20">Manager</option>
                <option value="43">Senior Manager</option>
                <option value="44">Director (12)</option>
                <option value="46">Analyst (13)</option>
                <option value="19">Specialist (14)</option>
                <option value="21">Coordinator (15)</option>
              </select>
            </div>

            {/* Skills Selection */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Skills <span className="text-red-500">*</span>
              </label>
              <select onChange={handleAddSkill} className={inputClass}>
                <option value="">-- Add a skill --</option>
                <option value="8">html</option>
                <option value="9">Skill 2</option>
                <option value="10">Skill 3</option>
                <option value="11">Skill 4</option>
                <option value="12">Skill 5</option>
                <option value="13">Skill 6</option>
                <option value="14">Skill 7</option>
                <option value="15">Skill 8</option>
                <option value="16">Skill 9</option>
                <option value="17">Skill 10</option>
                <option value="31">Skill 11</option>
                <option value="32">Skill 12</option>
                <option value="44">Skill 13</option>
                <option value="47">Skill 14</option>
                <option value="80">Skill 15</option>
                <option value="90">Skill 16</option>
                <option value="93">Skill 17</option>
                <option value="51">Skill 18</option>
                <option value="163">Skill 19</option>
                <option value="172">Skill 20</option>
              </select>
            </div>

            {/* Selected Skills Display */}
            {formData.skills.length > 0 && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Selected Skills ({formData.skills.length}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium"
                    >
                      Skill {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-white hover:text-red-200 font-bold text-lg"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Predicted Salary Display */}
            {predictedSalary && (
              <div className="p-6 bg-green-50 border-2 border-green-300 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Predicted Salary</p>
                <p className="text-4xl font-bold text-green-600">
                  ৳{parseFloat(predictedSalary).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Use this amount when adding a new employee
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Predicting...
                  </span>
                ) : (
                  "🔮 Predict Salary"
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">💡 How to use:</h3>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Select the grade, department, and designation</li>
            <li>Add relevant skills from the dropdown</li>
            <li>Click "Predict Salary" to get AI recommendation</li>
            <li>Use the predicted salary when adding a new employee</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PredictedSalary;