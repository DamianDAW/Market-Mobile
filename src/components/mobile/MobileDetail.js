import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FavContext from '../../context/FavContext'
import { getMobiles } from '../../services/getMobiles'
import { Spinner } from '../spinner/Spinner'
import './MobileDetail.css'

export const MobileDetail = () => {
  const params = useParams()
  const navigate = useNavigate()   
  const handleReturn = () => {
     navigate(-1)
  }

  const [ mobile, setMobile ] = useState([])  
  const {favorites, setFavorites} = useContext(FavContext)
  const [isFaved, setIsFaved ] = useState(() => {
    const isNewFaved = favorites.some(favorite => favorite.id === params.id)
    if(isNewFaved) {
      return true
    }
    return false    
  }
  ) 

  useEffect(() => {   
    getMobiles()
      .then(mobiles => {
        const filteredMobileById = mobiles.find((item) => item.id === params.id)
        setMobile(filteredMobileById)   
      })  
      .catch((e) => {
        console.error(e)
      })      
  }, [])



  if(!mobile) {
    return  navigate('/')      
  }


  const toggle = () => {
    let newFavorites
    const isFavorite = (favorites.filter(favorite => favorite.id === id)).length > 0
    if(isFavorite) {
       newFavorites = favorites.filter(favorite => favorite.id !== id)
    } else {
       newFavorites = [...favorites, {id, brand, model, imgUrl}]
    }
    setFavorites(newFavorites)
    window.localStorage.setItem('fav-mobile-list', JSON.stringify(newFavorites))   
    const isNewFaved = newFavorites.some(favId => favId.id === id)
    setIsFaved(isNewFaved)
  }  
    

  const {id, brand, model, price, imgUrl} = mobile

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

