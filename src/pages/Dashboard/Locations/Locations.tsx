import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar.tsx';
import UserProfile from '../../../components/Account/UserProfile.tsx';
import Table from '../../../components/Table/Table.tsx';
import Filter from '../../../components/Filter/Filter.tsx';

function Locations() {
  return (
    <div className="app-container">
    <Sidebar />
    <div className="main-content">
      <UserProfile />
      
      <h1>Locations</h1>
      <Filter />
      <Table />
    </div>
  </div>);
}

export default Locations;