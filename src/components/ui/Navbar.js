import { NavLink } from 'react-router-dom';
import './Navbar.css'

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark"> 
    
    <div className='navbar-brand'>
      <span>Market Mobile</span>
    </div>
    <div className="navbar-nav">
      <NavLink 
          className={({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') }
          to="/"
      >
          Home
      </NavLink>

      <NavLink 
          className={({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') }
          to="/list"
      >
        Favorites
      </NavLink>         
    </div>       


    </nav>

  )
}

