import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const { pathname } = useLocation();
  const isActive = (url) => {
    if (pathname === url) {
      return true;
    }
    return false;
  };
  return (
    <nav className="nav-div">
      <Link
        className={`navbar-item ${isActive("/mobiles") ? "navbar-active" : ""}`}
        to="/mobiles"
      >
        Market Mobile
      </Link>

      <Link
        className={`navbar-item ${
          isActive("/mobiles/favorites") ? "navbar-active" : ""
        }`}
        to="/mobiles/favorites"
      >
        Favorites
      </Link>
    </nav>
  );
};
