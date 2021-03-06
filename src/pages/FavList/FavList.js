import { useContext } from "react"
import {useNavigate } from "react-router-dom";
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
        <div className="button-div">
          <button className='button' onClick={handleReturn}>
                  Return
          </button>
        </div>      
      </div>            
    ) 
  }
    return (
      <>     
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
      </>  
    )
}
