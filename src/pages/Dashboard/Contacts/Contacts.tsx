import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar.tsx';
import UserProfile from '../../../components/Account/UserProfile.tsx';

function Contacts() {
  return (
    <div className="app-container">
    <Sidebar />
    <div className="main-content">
      <UserProfile />
      <h1>Contacts</h1>
    </div>
  </div>);

}

export default Contacts;