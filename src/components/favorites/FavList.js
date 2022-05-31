import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { MobileList } from "../mobile/MobileList"
import './FavList.css'

export const FavList = () => {

  const [ favorites, setFavorites ] = useState( () => {
      const data = window.localStorage.getItem('fav-mobile-list')
        if(data) {
        return JSON.parse(data)   
        } 
        return[]          
    }
  )


  const navigate = useNavigate()   
  const handleReturn = () => {
     navigate(-1)
  }  
   

  const handleSetFavorites= (newFavorites) => {
    setFavorites(newFavorites)
    window.localStorage.setItem('fav-mobile-list', JSON.stringify(newFavorites))   
  }

  // console.log(favorites);


  if(favorites.length === 0 ) {
    return (      
      <div className='center'>
        <h4>No items added to favorites</h4>
        <button className='button' onClick={handleReturn}>
                Return
        </button>
      </div>            
    ) 
  }
    return (
      <div>     
        <div>
        <h4>Favorites</h4>
          <hr/>
        </div> 
        <MobileList mobile={favorites} favorites={favorites}  onAddFavorites={handleSetFavorites} />
        <button className='button' onClick={handleReturn}>
                Return
        </button>
      </div>  
    )
}
