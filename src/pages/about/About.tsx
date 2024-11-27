import Header from '@/components/Header/Header';
import { CContainer, CRow, CCol, CCard, CCardBody, CCardHeader, CButton, CCardImage } from '@coreui/react';
import '../Home/Home.css';

const About = () => {
  const cardData = [
    {
      title: 'Who We Are',
      text: 'A team of passionate professionals in the film and production industry committed to empowering creatives.',
      img: 'src/assets/img/box.png',
    },
    {
      title: 'Our Vision',
      text: 'Empower filmmakers and creatives with seamless location management tools.',
      img: 'src/assets/img/car.png',
    },
    {
      title: 'Why Choose Us',
      text: 'Innovative features, user-friendly design, and collaborative tools to simplify your work.',
      img: 'src/assets/img/camera.png',
    },
    {
      title: 'Our Team',
      text: 'A diverse team with expertise in film, production, and technology.',
      img: 'src/assets/img/dashboard.png',
    },
  ];

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

        <CRow className="mt-5">
          {cardData.map((card, index) => (
            <CCol xs="12" md="6" lg="3" className="mb-4" key={index}>
              <CCard className="shadow-sm rounded border-0 hover-scale">
                <CCardImage orientation="top" src={card.img} alt={`${card.title} image`} />
                <CCardHeader className="text-primary text-center font-weight-bold bg-gradient rounded-top">
                  {card.title}
                </CCardHeader>
                <CCardBody>
                  <p className="text-muted text-center">{card.text}</p>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
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
