import Header from '@/components/Header/Header';
import { CContainer, CRow, CCol, CCard, CCardBody, CCardHeader, CButton } from '@coreui/react';
import '../Home/Home.css';

const About = () => {
  return (
    <>
    <CContainer className="py-4">
       <Header />
      <CRow className="justify-content-center text-center">
        <CCol md="8">
          <h1 className="display-4 text-primary mb-3">About Us</h1>
          <p className="lead text-muted">
            LocusPoint is a platform designed to streamline the organization and management of filming locations.
            Our mission is to simplify location scouting, management, and sharing for creatives and producers worldwide.
          </p>
        </CCol>
      </CRow>

      {/* About Sections */}
      <CRow className="mt-5">
        <CCol md="6" lg="3">
          <CCard className="shadow-sm">
            <CCardHeader className="text-primary text-center font-weight-bold">
              Who We Are
            </CCardHeader>
            <CCardBody>
              <p className="text-muted text-center">
                A team of passionate professionals in the film and production industry committed to empowering creatives.
              </p>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md="6" lg="3">
          <CCard className="shadow-sm">
            <CCardHeader className="text-primary text-center font-weight-bold">
              Our Vision
            </CCardHeader>
            <CCardBody>
              <p className="text-muted text-center">
                Empower filmmakers and creatives with seamless location management tools.
              </p>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md="6" lg="3">
          <CCard className="shadow-sm">
            <CCardHeader className="text-primary text-center font-weight-bold">
              Why Choose Us
            </CCardHeader>
            <CCardBody>
              <p className="text-muted text-center">
                Innovative features, user-friendly design, and collaborative tools to simplify your work.
              </p>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md="6" lg="3">
          <CCard className="shadow-sm">
            <CCardHeader className="text-primary text-center font-weight-bold">
              Our Team
            </CCardHeader>
            <CCardBody>
              <p className="text-muted text-center">
                A diverse team with expertise in film, production, and technology.
              </p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Call to Action */}
      <CRow className="justify-content-center text-center mt-5">
        <CCol md="4">
          <CButton color="primary" size="lg" href="/contact">
            Get in Touch
          </CButton>
        </CCol>
      </CRow>
    </CContainer>
    </>
  );
};

export default About;
