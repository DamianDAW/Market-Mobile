import { useContext} from "react";
import { useNavigate } from "react-router-dom"
import { NavLink } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
import './Navbar.css'

export const Navbar = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const {username}= useContext(AuthContext)

  

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark"> 
    
      <div className='navbar-brand'>
        <span>Market Mobile</span>
      </div>

      <div className="navbar-nav">
        <NavLink 
            className={({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') }
            to="/mobiles"
        >
            Home
        </NavLink>

        <NavLink 
            className={(!username)?'invisible' : ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '')}             
            to="/list"
        >
          Favorites
        </NavLink> 
      </div>   

      <div className='nav log'>
        {
          (!username) 
          ?
          <>
            <span className='nav-item nav-link text-info'>Invitate</span>
            <button 
                className='btn btn-outline-primary'
                onClick={handleLogout}
            >
              Register
            </button>     
          
          </>
          : 
          <>
            <span className='nav-item nav-link text-info'>{username}</span>
            <button 
                className='nav-item nav-link btn btn-outline-danger'
                onClick={handleLogout}
            >
              Logout
            </button>              
          </>
        }
      
      </div>   

    </nav>

  )
}

