import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import AppContext from "../../context/AppContext";
import { Cart } from "../Cart/Cart";
import { Counter } from "../Counter/Counter";

import './Navbar.css'

export const Navbar = () => {
  
  const [ isOpen, setIsOpen ] = useState(false)
  const { userData, setUserData, shoppingCart } = useContext(AppContext)
  const navigate = useNavigate()
  const { pathname } = useLocation()


  const isActive = (url) => {
    if (pathname === url) {
      return true
    }
    return false
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
      )
    } else {
      return (    
        <>        
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
                  className="cart cart-nav-disabled"
                  onClick={() => {
                    !isOpen ?
                      setIsOpen(true)
                    :
                      setIsOpen(false)
                  }}
                ></div>
                <Counter num={shoppingCart.products.length}></Counter>
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
        {isOpen && <Cart />}   
        </>    
      )
    } 
}

