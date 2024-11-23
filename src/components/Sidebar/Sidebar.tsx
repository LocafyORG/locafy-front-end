import CIcon from '@coreui/icons-react';
import { CNavGroup, CNavItem, CSidebar, CSidebarHeader, CSidebarNav, CSidebarToggler, CBadge } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import './Sidebar.css';
import { ROUTES } from '../../constants/Routes.ts';
import { Link } from 'react-router';

function Sidebar() {
  return (
    <div>
      <CSidebar className="sidebar-full-height border-end">
        <CSidebarHeader className="border-bottom sidebar-header">
          <i className="material-icons">whatshot</i>
          <span className="sidebar-title">Locus Point</span>
        </CSidebarHeader>
        <CSidebarNav>
          <CNavItem className="nav-item">
            <CIcon customClassName="nav-icon" />
            <Link to={ROUTES.PRODUCTIONS} className="nav-link">Productions</Link>
          </CNavItem>
          <CNavItem className="nav-item">
            <CIcon customClassName="nav-icon" />
            <Link to={ROUTES.LOCATIONS} className="nav-link">
              Locations
              <CBadge color="primary ms-auto">NEW</CBadge>
            </Link>
          </CNavItem>
          <CNavItem className="nav-item">
            <CIcon customClassName="nav-icon" />
            <Link to={ROUTES.CONTACTS} className="nav-link">Contacts</Link>
          </CNavItem>
          <CNavGroup 
            toggler={
              <>
                <CIcon customClassName="nav-icon" /> Nav dropdown
              </>
            }
          >
            <CNavItem className="nav-item">
              <Link to="/dropdown-item-1" className="nav-link">
                <span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item
              </Link>
            </CNavItem>
            <CNavItem>
              <Link to="/dropdown-item-2" className="nav-link">
                <span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item
              </Link>
            </CNavItem>
          </CNavGroup>
        </CSidebarNav>
        <CSidebarHeader className="border-top">
          <CSidebarToggler />
        </CSidebarHeader>
      </CSidebar>
    </div>
  );
}

export default Sidebar;
