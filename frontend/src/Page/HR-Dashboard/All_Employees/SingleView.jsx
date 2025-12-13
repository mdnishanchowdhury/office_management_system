function SingleView({ emp }) {
    const modalId = `modal_${emp.id}`;

    return (
        <div className="inline-block">
            <button
                onClick={() => document.getElementById(modalId).showModal()}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition text-sm"
            >
                View
            </button>

            {/* Modal */}
            <dialog id={modalId} className="modal">
                <div className="modal-box max-w-3xl rounded-2xl p-6">

                    {/* Close */}
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
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

                    {/* 2 Column Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Personal Information */}
                        <div className="border rounded-xl p-4 shadow-sm bg-gray-50">
                            <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
                            <div className="space-y-1 text-sm">
                                <p><strong>Email:</strong> {emp.email}</p>
                                <p><strong>Phone:</strong> {emp.phone}</p>
                                <p><strong>Address:</strong> {emp.address}</p>
                                <p><strong>Birthday:</strong> {emp.birth_date}</p>
                                <p><strong>Gender:</strong> {emp.gender}</p>
                                <p><strong>Status:</strong> {emp.status}</p>
                            </div>
                        </div>

                        {/* Job Details */}
                        <div className="border rounded-xl p-4 shadow-sm bg-gray-50">
                            <h3 className="font-semibold text-lg mb-2">Job Details</h3>
                            <div className="space-y-1 text-sm">
                                <p><strong>Department:</strong> {emp.department}</p>
                                <p><strong>Role:</strong> {emp.role}</p>
                                <p><strong>Grade:</strong> {emp.grade}</p>
                                <p><strong>Hire Date:</strong> {emp.hire_date}</p>
                                <p><strong>Position:</strong> {emp.position}</p>
                                <p><strong>Salary:</strong> {emp.salary}</p>
                            </div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="mt-6 border rounded-xl p-4 shadow-sm bg-gray-50">
                        <h3 className="font-semibold text-lg mb-2">Skills</h3>
                        <p className="text-gray-500 text-sm">No skills added.</p>
                    </div>

                </div>
            </dialog>
        </div>
    );
}

export default SingleView;
