import "@styles/pages/Home.scss";
import { Hero, Screen } from "@components/ui/PageBlock";
import { Col, Row } from "@components/Container";
import { Link } from "react-router";
import { ROUTES } from "@constants/Routes";
import Sunset from "@assets/img/auth.webp";

function Home() {
  return (
    <Col className="overflow-x-hidden">
      <Hero className="relative h-screen text-center justify-center items-center backdrop-blur-lg shadow-lg">
        <Col className="*:drop-shadow-xl w-1/4 justify-center items-center">
          <h1 className="text-7xl text-slate-900 font-extrabold">LocusPoint</h1>
          <p className="text-2xl text-slate-600">
            designed to streamline the organization and management of filming
            locations.
          </p>
          <Link
            className="bg-primary-500 text-white rounded-full px-3 py-2 w-fit"
            to={ROUTES.LOCATIONS}
          >
            Get Started
          </Link>
        </Col>
        <div className="absolute bottom-0 h-1/5 w-full bg-primary-500"></div>
      </Hero>

      <Screen className="relative m-0">
        <div className="absolute top-0 h-2/3 w-full bg-gradient-to-b from-indigo-500 to-transparent z-0"></div>
        <Row className="z-10 items-end">
          <img
            src={Sunset}
            style={{ width: "700px", height: "750px" }}
            className="m-5 object-cover w-32 h-24 rounded-3xl"
          />
          <Col className="*:drop-shadow-xl w-1/4 justify-center items-center">
            <h1 className="text-7xl text-slate-900 font-extrabold">Features</h1>
            <p className="text-2xl text-slate-600">
              Our app does this and that
            </p>
          </Col>
        </Row>
      </Screen>

      <Screen>Created by...</Screen>

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
