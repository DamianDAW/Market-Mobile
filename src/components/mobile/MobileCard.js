import { useEffect, useState, useContext } from 'react'
// import Spinner from 'react-bootstrap/esm/Spinner'
import { Link, useNavigate } from 'react-router-dom'
import FavContext from '../../context/FavContext'
// import { getMobiles } from '../../services/getMobiles'
import './MobileCard.css'

export const MobileCard = ({brand, model, price, img: imgUrl, id}) => {

  // const [mobiles, setMobiles ] = useState([])
  // const [isFaved, setIsFaved ] = useState(false)
  const {favorites, setFavorites} = useContext(FavContext)
  const [isFaved, setIsFaved ] = useState(() => {
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


  // useEffect(() => {  
  //   getMobiles()
  //     .then(mobiles => setMobiles(mobiles))
  //     .catch((e) => {
  //       console.error(e)
  //     })      
  //   }, [])

  
   const toggle = (e) => {
     e.stopPropagation()
     let newFavorites
     const isFavorite = (favorites.filter(favorite => favorite.id === id)).length > 0
     if(isFavorite) {
        newFavorites = favorites.filter(favorite => favorite.id !== id)
     } else {
        newFavorites = [...favorites, {id, brand, model, imgUrl}]
     }
     setFavorites(newFavorites)
     const isNewFaved = newFavorites.some(favId => favId.id === id)
     setIsFaved(isNewFaved)
   }  



    return (
      <div className={(isFaved) ? 'mobileCard-active' : 'mobileCard'} onClick={redirectClickOnCard}>   
        <div className="mobileCard-img"  >
          <img src={imgUrl}  alt ={model} />
        </div>
        <h5 className='mobileCard-title'  >{brand}</h5>
        <div className='elipsis'  >
        <h4 className='mobileCard-model'>{model}</h4>        
        </div>
        <Link className='mobileCard-link' to={`/mobiles/${id}`}>
          <span className='mobileCard-span'>More info...</span>
        </Link>           
        <div className="favorite-icon">
        <button
          type="button"
          className={(isFaved) ? 'on' : 'off'}
          onClick={(e) => {
            toggle(e)
          }}
        >
          <span aria-label="Fav Mobile" role='img' className="star">&#9733;</span>
       </button>
      </div>
      </div> 
    
    )

  // }
}


