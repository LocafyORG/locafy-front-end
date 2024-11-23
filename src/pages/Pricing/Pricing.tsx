import { CContainer, CRow, CCol, CCard, CCardBody, CCardHeader, CButton } from '@coreui/react';
import Header from '@/components/Header/Header';
import './Pricing.css';

const PricingPage = () => {
  return (
    <CContainer className="py-5">
      <Header />
       <CRow className="justify-content-center text-center">
        <CCol md="8">
          <h1 className="display-4 text-primary mb-3">Pricing Plans</h1>
          <p className="lead text-muted">
            Choose the plan that fits your needs and take your production management to the next level.
          </p>
        </CCol>
      </CRow>

      {/* Pricing Cards */}
      <CRow className="mt-5">
        {/* Basic Plan */}
        <CCol md="4">
          <CCard className="shadow-sm">
            <CCardHeader className="text-center bg-light">
              <h2 className="font-weight-bold text-primary">Basic</h2>
              <p className="text-muted">$9.99 / month</p>
            </CCardHeader>
            <CCardBody>
              <ul className="list-unstyled text-center text-muted mb-4">
                <li>Up to 10 locations</li>
                <li>Basic location details</li>
                <li>Email support</li>
              </ul>
              <div className="text-center">
                <CButton color="primary" href="/subscribe/basic">
                  Choose Basic
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Pro Plan */}
        <CCol md="4">
          <CCard className="shadow-lg">
            <CCardHeader className="text-center bg-primary text-white">
              <h2 className="font-weight-bold">Pro</h2>
              <p>$29.99 / month</p>
            </CCardHeader>
            <CCardBody>
              <ul className="list-unstyled text-center mb-4">
                <li>Up to 50 locations</li>
                <li>Detailed analytics</li>
                <li>Priority email support</li>
              </ul>
              <div className="text-center">
                <CButton color="light" href="/subscribe/pro">
                  Choose Pro
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Enterprise Plan */}
        <CCol md="4">
          <CCard className="shadow-sm">
            <CCardHeader className="text-center bg-light">
              <h2 className="font-weight-bold text-primary">Enterprise</h2>
              <p className="text-muted">Contact Us</p>
            </CCardHeader>
            <CCardBody>
              <ul className="list-unstyled text-center text-muted mb-4">
                <li>Unlimited locations</li>
                <li>Dedicated account manager</li>
                <li>24/7 support</li>
              </ul>
              <div className="text-center">
                <CButton color="primary" href="/contact">
                  Contact Us
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default PricingPage;
