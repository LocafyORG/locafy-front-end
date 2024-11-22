import React from 'react';
import { Link, Outlet, Routes } from 'react-router-dom';
import { BASE_PATH, ROUTES } from '../../constants/Routes.ts';


function Dashboard() {
    return (
        <>
          <div className="row remove-margin">

    
            <div className="nav-wrapper">
              <ul className="header">
                <li>
                  <Link to={BASE_PATH}>
                    <span className="material-icons">notifications</span>
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.PROFILE}>
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