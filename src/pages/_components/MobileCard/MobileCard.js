
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../../context/AuthContext'
import { useFavoriteMobile } from '../../../hooks/useFavoriteMobile'
import { BsCartPlus, BsCartDash } from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'
import CartContext from '../../../context/CartContext'
import './MobileCard.css'




export const MobileCard = ({mobile}) => {
  const {id, brand, model, price, imgUrl} = mobile
  const navigate = useNavigate()
  const redirectClickOnCard = () => {
    navigate(`/mobiles/${id}`)        
  }


  // Contexto Carrito
  const { addedToCart, setAddedToCart } = useContext(CartContext)
  const isAdded = addedToCart.find((addedID) => addedID.id === id)

  const addToCart = (event) =>  {
    event.stopPropagation()
    let newMobilesAdded
    const isAddedToCart = (addedToCart.filter(added => added.id === id)).length > 0
    if(isAddedToCart) {
       newMobilesAdded = addedToCart.filter(added => added.id !== id)
    } else {
       newMobilesAdded = [...addedToCart, {id, brand, model, imgUrl, price}]
    }
    setAddedToCart(newMobilesAdded)
    window.localStorage.setItem('cart-added-mobiles', JSON.stringify(newMobilesAdded))   

  }  
  
  
  const initialState = {
    id,
    brand,
    model,
    price,
    imgUrl
  }
   const [isFavorite, changeFav] = useFavoriteMobile(initialState)

   const{username} = useContext(AuthContext)

    return (
      <div 
        className={(isFavorite) ? 'mobileCard-active' : 'mobileCard'} 
        onClick={redirectClickOnCard}
      >   
        <div className="mobileCard-img"  >
          <img src={imgUrl}  alt ={model} />

          <IconContext.Provider value={{color: "gray", className: "global-class-name", size: '1.75rem' }}>
            <button 
              className='buttonIcon' 
              onClick={addToCart} 
              aria-label='shopping cart' 
              title='Add mobile to shopping cart'
            >
              <i className='icon-cart'>
                {
                  (isAdded) 
                  ?
                  <BsCartDash />
                  :
                  <BsCartPlus style={{color: "#232b2b"}} />           
                }
              </i>
            </button>
          </IconContext.Provider>
        </div>
        <h5 className='mobileCard-title'>{brand}</h5>
        <div className='elipsis' >
          <h4 className='mobileCard-model'>{model}</h4>        
        </div>
        <Link className='mobileCard-link' to={`/mobiles/${id}`}>
          <span className='mobileCard-span'>More info...</span>
        </Link>
        {
          (username)
          ?
            <div className="favorite-icon">
              <button
                type="button"
                className={(isFavorite) ? 'on' : 'off'}
                onClick={(event) => {
                  changeFav(event)
                }}
              >
                <span aria-label="Fav Mobile" role='img' className="star">&#9733;</span>
              </button>
            </div>
          :
            <></>
        }                   
      </div> 
    
    )

  // }
}


