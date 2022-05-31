// import { useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import FavContext from '../../context/FavContext'
import { useSingleMobile } from '../../hooks/useSingleMobile'
import { useToggle } from '../../hooks/useToggle'
import { Spinner } from '../spinner/Spinner'
import './MobileDetail.css'

export const MobileDetail = () => {

  const params = useParams()
  const navigate = useNavigate()   
  const handleReturn = () => {
     navigate(-1)
  }

  const [mobile] = useSingleMobile(params.id) // Hook sustituye a getmobile con el useEffect

  // const { favorites, setFavorites } = useContext(FavContext)
  // const [isFaved, setIsFaved ] = useState(() => {
  //   const isNewFaved = favorites.some(favorite => favorite.id === params.id)
  //   if(isNewFaved) {
  //     return true
  //   }
  //   return false    
  // }
  // ) 


  // const toggle = () => {
  //   let newFavorites
  //   const isFavorite = (favorites.filter(favorite => favorite.id === params.id)).length > 0
  
  //   if(isFavorite) {
  //      newFavorites = favorites.filter(favorite => favorite.id !== params.id)
  //   } else {
  //      newFavorites = [...favorites, {id, brand, model, imgUrl}]
  //   }
  //   setFavorites(newFavorites)
  //   window.localStorage.setItem('fav-mobile-list', JSON.stringify(newFavorites))   
  //   const isNewFaved = newFavorites.some(favId => favId.id === params.id)
  //   setIsFaved(isNewFaved)
  // }  
    
  

  const {id, brand, model, price, imgUrl} = mobile
  const [isFaved, toggle] = useToggle(id, brand, model, price, imgUrl)

  // if(typeof mobile.id === 'undefined') {
  //   return  navigate('/')      
  // }

  if(mobile.length === 0 ) {
    return (
      <div className='center'>
          <Spinner />
      </div>          
    ) 
  } else {      
    return (     
      <div className='infoRow'>
        <div className='col-left'>
          <img src={imgUrl} alt={model} className='img-thumbnail' />    
        </div>
        <div className="favorite-icon-detail">
          <button 
            onClick={toggle}  
            >
              {(isFaved) ? 'Remove from wishlist' : 'Add to wishlist'}
          </button>       
        </div>
        <div className='col-right'>
          <section className="mobileInfo">
            <header className="mobileInfo-header">
              <h3>{model}</h3>
            </header>
            <ul className="mobileInfo-list">
              <li>              
                <b>Brand:</b> <span>{brand}</span>
              </li>
              <li>
                <b>Id:</b> {id}
              </li>
              <li>
                <b>Price:</b> {price}€
              </li>           
            </ul>
          </section>
          <button className='button' onClick={handleReturn}>
            Return
          </button>
        </div>      
      </div>       
            
    )
  } 

}

