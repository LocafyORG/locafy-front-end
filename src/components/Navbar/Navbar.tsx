import "./Navbar.css";
import { Link } from "react-router";
import { ROUTES } from "../../constants/Routes.ts";

function Navbar() {
  return (
    <nav className="navbar-fixed fix-navbar">
      <div className="nav-wrapper sidenav-dashboard">
        <Link to={ROUTES.PRODUCTIONS} className="brand-logo">
          <i className="material-icons">whatshot</i>{" "}
          <span className="truncate">Locus Point</span>
        </Link>

        <a href="#!" data-target="mobile-demo" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to={ROUTES.HOME}>Settings</Link> 
          </li>
          <li>
            <Link to={ROUTES.PROFILE}>Profile</Link>
          </li>
        </ul>
      </div>

      <ul id="mobile-demo" className="sidenav grey-text">
        <li>
          <span className="nav-title" style={{ fontSize: '12px', padding: '0', color: 'black' }}>
            Project Management
          </span>
        </li>
        <li>
          <Link to={ROUTES.PRODUCTIONS}>Productions</Link>
        </li>
        <li>
          <Link to={ROUTES.LOCATIONS}>Locations</Link>
        </li>
        <li>
          <Link to={ROUTES.CONTACTS}>Contacts</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
