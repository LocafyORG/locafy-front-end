import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <nav className="blue">
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo">
            <i className="material-icons">whatshot</i> Locus Point
          </Link>

          <a href="#top" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/auth/login">Login</Link>
            </li>
          </ul>
        </div>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/">Pricing</Link>
          </li>
          <li>
            <Link to="/auth/login">Login</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
