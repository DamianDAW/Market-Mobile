import { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import { Link, useNavigate } from 'react-router-dom'
import { getMobiles } from '../../services/getMobiles'
import './MobileCard.css'

export const MobileCard = ({brand, model, price, img: imgUrl, id, favorites, onAddFavorites}) => {

  const [mobiles, setMobiles ] = useState([])
  // const [isFaved, setIsFaved ] = useState(false)
  const [isFaved, setIsFaved ] = useState(() => 
    {
      const isNewFaved = favorites.some(favorite => favorite.id === id)
      if(isNewFaved) {
        return true
      }
      return false    
    }
  )

  const navigate = useNavigate()
  const redirectClickOnCard = () => {
    navigate(`/mobiles/${id}`)        
  }


  useEffect(() => {  
    getMobiles()
      .then(mobiles => setMobiles(mobiles))
      .catch((e) => {
        console.error(e)
      })      
    }, [])

  
   const toggle = () => {
     let newFavorites
     const isFavorite = (favorites.filter(favorite => favorite.id === id)).length > 0
     if(isFavorite) {
        newFavorites = favorites.filter(favorite => favorite.id !== id)
     } else {
        newFavorites = [...favorites, {id, brand, model, imgUrl}]
     }
     onAddFavorites(newFavorites)
     const isNewFaved = newFavorites.some(favId => favId.id === id)
     setIsFaved(isNewFaved)
   }  


  // if(mobiles.length === 0 ) {
  //   return (
  //     <Spinner animation="grow" variant="dark" size="sm"/>
  //   ) 

  // } else {        

    return (
      <div className="mobileCard">   
        <div className="mobileCard-img"  onClick={redirectClickOnCard}>
          <img src={imgUrl}  alt ={model} />
        </div>
        <h5 className='mobileCard-title'  onClick={redirectClickOnCard}>{brand}</h5>
        <div className='elipsis'  onClick={redirectClickOnCard}>
        <h4 className='mobileCard-model'>{model}</h4>        
        </div>
        <Link className='mobileCard-link' to={`/mobiles/${id}`}>
          <span className='mobileCard-span'>More info...</span>
        </Link>           
        <div className="favorite-icon">
        <button
          type="button"
          className={(isFaved) ? 'on' : 'off'}
          onClick={toggle}
        >
          <span aria-label="Fav Mobile" role='img' className="star">&#9733;</span>
       </button>
      </div>
      </div> 
    
    )

  // }
}


