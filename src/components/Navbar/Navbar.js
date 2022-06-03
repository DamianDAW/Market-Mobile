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

  
//   if(window.innerWidth===425) {
// return(

//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
   
//    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>
//   <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//     <div className="navbar-nav">
//       <a className="nav-item nav-link active" href="##">Home <span class="sr-only">(current)</span></a>
//       <a className="nav-item nav-link" href="##">Features</a>
//       <a className="nav-item nav-link" href="##">Pricing</a>
//       <a className="nav-item nav-link disabled" href="##" tabindex="-1" aria-disabled="true">Disabled</a>
//     </div>
//     </div>
//   </nav>
// )
//   }   
     
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
  
          <NavLink 
              className={(!username)?'invisible' : ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '')}             
              to="/cart"
          >
            Cart
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



