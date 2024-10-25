import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div className="home container center">
        <div className="row center">
          <br />
          <br />
          <h1 className="orange-text text-darken-1">Locus Point</h1>
          <h5>Maximize productivity, master logistics.</h5>
          <br />
          <Link
            to="/login"
            className="btn-large waves-effect waves-light orange darken-1"
          >
            Get Started
          </Link>
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

    </>
  );
}

export default Home;