import React, { useState } from 'react';
import { CNavbar, CContainer, CNavbarToggler, CCollapse, CNavbarBrand, CNavbarNav, CNavItem, CNavLink, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilAppsSettings, cilUser } from '@coreui/icons';

const UserProfile = () => {
  const [visible, setVisible] = useState(false);

  //TODO: add in the user profile image and functionality
  return (
    <>
      <CNavbar 
        expand="lg" 
        style={{ 
          position: 'relative', 
          zIndex: 1000, 
          border: 'none', 
          boxShadow: 'none', 
          backgroundColor: 'transparent'
        }} 
      >
        <CContainer fluid>
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
          />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav className="me-auto mb-2 mb-lg-0">
              
            </CNavbarNav>
            <div className="d-flex">
              <CButton className="me-2" color="link" aria-label="Settings">
                <CIcon icon={cilAppsSettings} />
              </CButton>
              <CButton className="me-2" color="link" aria-label="User Account">
                <CIcon icon={cilUser} />
              </CButton>
            </div>
          </CCollapse>
        </CContainer>
      </CNavbar>
    </>
  );
}

export default UserProfile;
