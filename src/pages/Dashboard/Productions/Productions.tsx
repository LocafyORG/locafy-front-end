import React from "react";
import "./Productions.css";
import Sidebar from "../../../components/Sidebar/Sidebar.tsx";
import Navbar from "../../../components/Navbar/Navbar.tsx";

function Productions() {
  return (
    <div className="productions-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <h1>Productions</h1>
      </div>
    </div>
  );
}

export default Productions;
