import "@styles/pages/Home.scss";
import { Screen } from "@components/ui/PageBlock";
import { Col, Row } from "@components/Container";
import { Link } from "react-router";
import { ROUTES } from "@constants/Routes";
import Sunset from "@assets/img/auth.webp";
import { Button } from "@components/Button";

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
      <Col className="h-screen w-screen bg-[url(/src/assets/img/wave1.svg)] bg-no-repeat bg-cover bg-bottom items-center">
        <Col className="*:drop-shadow-xl w-1/4 justify-center items-center text-center">
          <h1 className="text-7xl text-slate-900 font-extrabold">LocusPoint</h1>
          <p className="text-2xl text-slate-600">
            designed to streamline the organization and management of filming
            locations.
          </p>
          <Button>
            <Link to={ROUTES.LOCATIONS}>Get Started</Link>
          </Button>
        </Col>
      </Col>

      <Screen className="relative bg-indigo-500 pt-[120px] pb-[64px]">
        <Row className="m-12 h-[320px] rounded-lg z-10 bg-indigo-100 items-end shadow-md">
          <img
            src={Sunset}
            className="m-5 object-cover h-2/3 w-1/3 rounded-3xl"
          />
          <Col className="*:drop-shadow-xl w-1/4 justify-center items-center flex-grow">
            <h1 className="text-7xl text-slate-800 font-extrabold">Features</h1>
            <p className="text-2xl text-slate-600">
              Our app does this and that
            </p>
          </Col>
        </Row>
        <Col className="z-10 m-12 rounded-lg bg-indigo-100 items-end shadow-md">
          <Row className="">
            <img
              src={Sunset}
              className="m-5 object-cover h-2/3 w-1/3 rounded-3xl"
            />
            <Col className="*:drop-shadow-xl w-1/4 justify-center items-center flex-grow">
              <h1 className="text-7xl text-slate-800 font-extrabold">
                Features
              </h1>
              <p className="text-2xl text-slate-600">
                Our app does this and that
              </p>
            </Col>
          </Row>
        </Col>
      </Screen>

      <div className="relative h-[200px] w-full m-0 bg-[url(/src/assets/img/wave2.svg)] bg-no-repeat bg-cover">
        <div className="absolute w-full h-[1px] bg-indigo-500"></div>
      </div>

      <Screen className="">Created by...</Screen>

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
