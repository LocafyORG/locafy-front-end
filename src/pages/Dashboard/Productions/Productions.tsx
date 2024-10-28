import React from "react";
import "./Productions.css";
import Sidebar from "../../../components/Sidebar/Sidebar.tsx";
import UserProfile from "../../../components/Account/UserProfile.tsx";

function Productions() {
  return (
    <div className="app-container">
    <Sidebar />
    <div className="main-content">
      <UserProfile />
      <h1>Productions</h1>
    </div>
  </div>
  );
}

export default Productions;
