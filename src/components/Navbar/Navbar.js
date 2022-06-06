import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { Counter } from "../Counter/Counter";

import "./Navbar.css";

export const Navbar = () => {
  const { userInfo, setUserInfo, carrito } = useContext(AppContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isCarritoEnabled, setIsCarritoEnabled] = useState(false);
  const isActive = (url) => {
    if (pathname === url) {
      return true;
    }
    return false;
  };

  const changeEnabledState = () => {
    if (isCarritoEnabled) {
      setIsCarritoEnabled(false);
    } else {
      setIsCarritoEnabled(true);
    }
  };

  const handleClickLogin = () => {
    navigate("/mobiles/login");
  };

  const handleClickLogOut = () => {
    setUserInfo({ email: "", isLogged: false });
  };
  if (!userInfo.isLogged) {
    return (
      <nav className="nav-div">
        <div className="nav-div__left-side">
          <Link
            className={`navbar-item ${isActive("/mobiles") ? "active" : ""}`}
            to="/mobiles"
          >
            Market Mobile
          </Link>
        </div>

        <div className="nav-div__rigth-side">
          <div
            className={`navbar-item__rigth-side ${
              isActive("/mobiles/login") ? "active" : ""
            }`}
            onClick={handleClickLogin}
          >
            LogIn
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="nav-div">
        <div className="nav-div__left-side">
          <Link
            className={`navbar-item ${isActive("/mobiles") ? "active" : ""}`}
            to="/mobiles"
          >
            Market Mobile
          </Link>

          <Link
            className={`navbar-item ${
              isActive("/mobiles/favorites") ? "active" : ""
            }`}
            to="/mobiles/favorites"
          >
            Favorites
          </Link>
        </div>

        <div className="nav-div__rigth-side">
          <div className="navbar-item__rigth-side">
            <div className="relative">
              <div
                className={`carrito carrito${
                  isCarritoEnabled ? "-nav-enabled" : "-nav-disabled"
                }`}
                onClick={changeEnabledState}
              ></div>
              <Counter num={carrito.productos.length}></Counter>
            </div>
          </div>
          <div
            className={`navbar-item__rigth-side ${
              isActive("/mobiles/login") ? "active" : ""
            }`}
            onClick={handleClickLogOut}
          >
            LogOut
          </div>
        </div>
      </nav>
    );
  }
};
