import React, { useState, useEffect } from "react";

const ContentDashboard = () => {
  // Dummy content data
  const [contents, setContents] = useState([]);

  useEffect(() => {
    // Replace with API call in real app
    const dummyData = [
      { id: 1, title: "Office Maintenance", description: "Water supply will be off from 2 PM to 5 PM." },
      { id: 2, title: "New Policy Update", description: "Updated leave policy effective from next month." },
      { id: 3, title: "Canteen Special", description: "New pizza menu available this week." },
    ];
    setContents(dummyData);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Content Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.map((content) => (
          <div
            key={content.id}
            className="bg-gray-800 text-white rounded-lg shadow-md p-4 hover:bg-gray-700 transition-all"
          >
            <h3 className="text-lg font-bold mb-2">{content.title}</h3>
            <p className="text-gray-300 text-sm">{content.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentDashboard;
