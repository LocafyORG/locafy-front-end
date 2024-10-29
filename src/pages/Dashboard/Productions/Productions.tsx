import React, { useState } from "react";
import "./Productions.css";
import Sidebar from "../../../components/Sidebar/Sidebar.tsx";
import UserProfile from "../../../components/Account/UserProfile.tsx";
import Card from "../../../components/Card/Card.tsx";
import SortControls from "../../../components/SortControls/SortControls.tsx";

function Productions() {
  const [sortKey, setSortKey] = useState("title");

  const testData = [
    { title: "Location 1", description: "A beautiful beach with clear water." },
    { title: "Location 2", description: "A bustling city center with skyscrapers." },
    { title: "Location 3", description: "A serene mountain landscape." },
  ];

  // Sort data based on the selected key
  const sortedData = [...testData].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return -1;
    if (a[sortKey] > b[sortKey]) return 1;
    return 0;
  });

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <UserProfile />
        <h1>Productions</h1>
        

        <SortControls onSortChange={(value) => setSortKey(value)} />
        <div className="card-container">
          {sortedData.map((item, index) => (
            <Card key={index} title={item.title} description={item.description} />
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default Productions;
