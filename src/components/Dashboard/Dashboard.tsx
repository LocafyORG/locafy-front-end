import React from 'react';
import { Link, Outlet, Routes } from 'react-router-dom';

function Dashboard() {
    return (
        <>
          <div className="row remove-margin">

    
            <div className="nav-wrapper">
              <ul className="header">
                <li>
                  <Link to="/dashboard">
                    <span className="material-icons">notifications</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/profile">
                    <span className="small material-icons">account_circle</span>
                  </Link>
                </li>
              </ul>
            </div>
    
            <div className="move-dashboard-down">
              <Routes>
              {/* <Route path="/" element={<Productions />} />
                <Route path="/profile" element={<Profile />} /> */}
              </Routes>
              <Outlet />
            </div>
          </div>
        </>
      );
}

export default Dashboard;