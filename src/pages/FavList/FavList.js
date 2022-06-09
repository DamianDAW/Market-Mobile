import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import FavContext from "../../context/AppContext";
import { MobileList } from "../_components/MobileList/MobileList"
import './FavList.css'

export const FavList = () => {

  const {favorites} = useContext(FavContext)
 
  const navigate = useNavigate()   
  const handleReturn = () => {
     navigate('/mobiles')
  }     


  if(favorites.length === 0 ) {
    return (      
      <div className='center'>
        <h4>No items added to favorites</h4>
        <button className='button' onClick={handleReturn}>
                Return
        </button>
        <div className="footer-basic">
          <footer>            
            <ul className="list-inline">          
              <li className="list-inline-item">
                <Link                  
                  to="/mobiles"
                  >
                  <span>Home</span>
                </Link>
              </li>
              <li className="list-inline-item">
                <a href="##">Cart</a>
              </li>                
            </ul>                         
              <p className="copyright">Market Mobile © 2022</p>
          </footer>
        </div>          
      </div>            
    ) 
  }
    return (
      <div>     
        <div>
        <h4>Favorites</h4>
          <hr/>
        </div> 
        <MobileList mobiles={favorites} />
        <div className="button-div">
          <button className='button' onClick={handleReturn}>
                  Return
          </button>
        </div>
        <div className="footer-basic">
          <footer>            
            <ul className="list-inline">          
              <li className="list-inline-item">
                <Link                  
                  to="/mobiles"
                  >
                  <span>Home</span>
                </Link>
              </li>
              <li className="list-inline-item">
                <a href="##">Cart</a>
              </li>                
            </ul>                         
              <p className="copyright">Market Mobile © 2022</p>
          </footer>
        </div>          
      </div>  
    )
}
