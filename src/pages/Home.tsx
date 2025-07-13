import "@styles/pages/Home.scss";
import { Screen } from "@components/ui/PageBlock";
import { Col, Row } from "@components/Container";
import { Link } from "react-router";
import { ROUTES } from "@constants/Routes";
import { Button } from "@components/Button";
import { HeroSection, FeatureCard } from "@components/ui";

/**
 * Hero
 * Features
 * Pricing
 * Why us
 * CTA
 */
function Home() {
  return (
    <Col className="overflow-x-hidden">
      <HeroSection
        title="LocusPoint"
        description="designed to streamline the organization and management of filming locations."
        backgroundImage="/src/assets/img/wave1.svg"
      >
        <Button>
          <Link to={ROUTES.LOCATIONS}>Get Started</Link>
        </Button>
      </HeroSection>

      <Screen className="relative bg-indigo-500 m-0">
        <Row className="m-12 mb-0 h-[320px] z-10 items-end">
          <FeatureCard
            icon="/src/assets/img/landing/icon-contacts.svg"
            title="Collaboration"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget ante metus."
          />
          <FeatureCard
            icon="/src/assets/img/landing/icon-images.svg"
            title="Locations"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget ante metus."
          />
          <FeatureCard
            icon="/src/assets/img/landing/icon-contacts.svg"
            title="Whatever"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget ante metus."
          />
        </Row>
      </Screen>

      <Screen className="relative items-start">
        <span className="absolute top-0 h-[400px] z-0 w-full m-0 bg-[url(/src/assets/img/wave2.svg)] bg-no-repeat bg-cover bg-bottom" />
        <Col className="pt-[128px] z-10 w-full justify-center items-center">
          <img
            className="w-[800px] h-[400px] object-cover rounded-lg"
            src="/src/assets/img/auth.webp"
          />
          <Col className="z-10 px-64 text-center w-full justify-center items-center">
            <h1 className="text-slate-900 font-bold text-6xl mt-[48px] mb-[24px]">
              About us
            </h1>
            <p>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              eget ante metus. Integer ac volutpat ipsum, eu pulvinar lacus.
              Pellentesque at felis quis felis eleifend fringilla eget vitae
              dolor. Ut efficitur interdum ex, quis pretium lectus rutrum vel.
              Donec volutpat fermentum dolor, id tristique ante commodo sed.
              Cras interdum neque mi, quis molestie neque cursus vel. Aenean
              auctor, est in cursus posuere, magna lorem imperdiet sem, vitae
              tincidunt arcu leo sit amet est. Proin odio elit, interdum quis
              ipsum id, fringilla pulvinar felis.
            </p>
          </Col>
        </Col>
      </Screen>

      <Screen>Plz buy our app. Thank</Screen>
      {/*
      <Header />
      <div className="home container center">
        <div className="row center">
          <br />
          <br />
          <h1 className="blue-text text-darken-1">Locus Point</h1>
          <h5>Maximize productivity, master logistics.</h5>
          <br />
          <div className="button-container">
            <Link
              to="/auth/login"
              className="btn waves-effect waves-light blue darken-1 custom-btn"
            >
              Get Started
            </Link>
          </div>

          <br />
          <br />
        </div>

        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center blue-text">
                  <i className="material-icons">flash_on</i>
                </h2>
                <h5 className="center">Skin Removal</h5>

                <p className="light">
                  The bugs are hiding under your skin, please remove it as soon
                  as possible. Totam rem aperiam, eaque ipsa quae ab illo
                  inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo.
                </p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center blue-text">
                  <i className="material-icons">group</i>
                </h2>
                <h5 className="center">User Experience Focused</h5>

                <p className="light">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center blue-text">
                  <i className="material-icons">settings</i>
                </h2>
                <h5 className="center">Easy to work with</h5>

                <p className="light">
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system, and expound the actual
                  teachings of the great explorer of the truth, the
                  master-builder of human happiness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      */}
    </Col>
  );
}



export default Home;
