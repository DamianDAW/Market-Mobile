import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import AppContext from "../../context/AppContext";
import { Counter } from "../Counter/Counter";

import './Navbar.css'

export const Navbar = () => {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { userData, setUserData, addedToCart } = useContext(AppContext)

  // const [isCartEnabled, setIsCartEnabled] = useState(false)
  const isActive = (url) => {
    if (pathname === url) {
      return true
    }
    return false
  }

  const changeCartView = () => {
  navigate("/mobiles/cart")
  }

  const handleLogin = () => {
    navigate("/mobiles/login");
  }

  const handleLogout = () => {
    setUserData({ email: "", isLogged: false })
  }
 
 
  if (!userData.isLogged) {
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
              isActive("/mobiles/login") ? "active" : "" }`}
            onClick={handleLogin}
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
       

        {/* <Link
            className={`navbar-item ${
              isActive("/mobiles/cart") ? "active" : ""
            }`}
            to="/mobiles/cart"
          >
            Cart
          </Link> */}

        </div>

        <div className="nav-div__rigth-side">
          <div className="navbar-item__rigth-side">
            <div className="relative">
              <div
                // className={`cart cart${
                //   isCartEnabled ? "-nav-enabled" : "-nav-disabled"
                // }`}
                className="cart cart-nav-disabled"
                onClick={changeCartView}
              ></div>
              <Counter num={addedToCart.items.length}></Counter>
            </div>
          </div>
          <div
            className={`navbar-item__rigth-side ${
              isActive("/mobiles/login") ? "active" : ""
            }`}
            onClick={handleLogout}
          >
            LogOut
          </div>
        </div>
      </nav>
    );
  }


}




