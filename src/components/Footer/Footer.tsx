import "./Footer.css";
import React from "react";

function Footer() {
  return (
    <footer className="page-footer darken-3">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Contact Us</h5>
            <p className="grey-text text-lighten-4">
              555 Lanes View Dr, Oakville <br />
              Ontario, Canada, L6H OP7. <br />
              <br />
              +1 (705) 789-1423
              <br />
              locus@point.com
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Social Media</h5>
            <ul>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Link 1
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Link 2
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Link 3
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Link 4
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2024 Locus Point
          <a className="grey-text text-lighten-4 right" href="#!">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
