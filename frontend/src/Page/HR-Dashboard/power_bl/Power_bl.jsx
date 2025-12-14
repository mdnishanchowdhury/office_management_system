import React from "react";

function Power_bl() {
  const reportUrl = "https://app.powerbi.com/groups/me/reports/5f6fcb6a-7364-4f14-8cd4-06876e40cc69/950467eb02c960bed677?ctid=d64fc2a1-e3c6-4a8a-8d65-4366182c78f6&experience=power-bi";

  return (
    <div className="p-4">
      <a
        href={reportUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Open Power BI Report
        </button>
      </a>
    </div>
  );
}

export default Power_bl;
