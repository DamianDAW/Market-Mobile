import { Link } from 'react-router-dom';
import './Navbar.css'

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">        
        <Link 
          className="navbar-brand" 
          to="/"
        >
          Market Mobile
        </Link> 
    </nav>
  )
}

