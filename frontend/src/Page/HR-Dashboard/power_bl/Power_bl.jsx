import React from "react";

function Power_bl() {
  const reportUrl = "https://app.powerbi.com/groups/me/reports/5f6fcb6a-7364-4f14-8cd4-06876e40cc69/950467eb02c960bed677?ctid=d64fc2a1-e3c6-4a8a-8d65-4366182c78f6&experience=power-bi";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Power BI Dashboard
        </h1>
        <p className="text-gray-600 mb-8">
          Click the button below to open the live Power BI report in a new tab.
        </p>
        <a href={reportUrl} target="_blank" rel="noopener noreferrer" className="w-full">
          <button className="w-full bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-blue-600 transition-all duration-300">
            Open Power BI Dashboard
          </button>
        </a>
      </div>
    </div>
  );
}

export default Power_bl;
