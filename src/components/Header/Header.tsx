import "./Header.css";
import { Link } from "react-router";
import { ROUTES } from "../../constants/Routes";

function Header() {
  return (
    <>
      <nav className="blue">
        <div className="nav-wrapper container">
          <Link to={ROUTES.HOME} className="brand-logo">
            <i className="material-icons">whatshot</i> Locus Point
          </Link>

          <a href="#top" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to={ROUTES.ABOUT}>About</Link>
            </li>
            <li>
              <Link to={ROUTES.PRICING}>Pricing</Link>
            </li>
            <li>
              <Link to={ROUTES.LOGIN}>Login</Link>
            </li>
          </ul>
        </div>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <Link to={ROUTES.HOME}>About</Link>
          </li>
          <li>
            <Link to={ROUTES.PRICING}>Pricing</Link>
          </li>
          <li>
            <Link to={ROUTES.LOGIN}>Login</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
