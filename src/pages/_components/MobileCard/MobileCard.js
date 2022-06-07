
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppContext from '../../../context/AppContext'
import { useFavoriteMobile } from '../../../hooks/useFavoriteMobile'
import './MobileCard.css'



export const MobileCard = ({mobile}) => {
  const { userData, setAddedToCart, addedToCart } = useContext(AppContext)
  const {id, brand, model, price, imgUrl} = mobile
  const navigate = useNavigate()
  const redirectClickOnCard = () => {
    navigate(`/mobiles/${id}`)        
  }



  // const isAdded = addedToCart.items.map(item => item.id).filter(ite)
  
  // console.log(isAdded);
 
  
  const initialState = {
    id,
    brand,
    model,
    price,
    imgUrl
  }

   const [isFavorite, changeFav] = useFavoriteMobile(initialState)

    return (
      <div
      className={isFavorite ? "mobileCard-active" : "mobileCard"}
      onClick={redirectClickOnCard}
    >
      <div className="mobileCard-img">
        <img src={imgUrl} alt={model} />
      </div>
      <h5 className="mobileCard-title">{brand}</h5>
      <div className="elipsis">
        <h4 className="mobileCard-model">{model}</h4>
      </div>
      <Link className="mobileCard-link" to={`/mobiles/${id}`}>
        <span className="mobileCard-span">More info...</span>
      </Link>
      {userData.isLogged && (
        <div className="userOptions-container">
          <div className="favorite-icon">
            <button
              type="button"
              className={isFavorite ? "on" : "off"}
              onClick={(event) => {
                changeFav(event);
              }}
            >
              <span aria-label="Fav Mobile" role="img" className="star">
                &#9733;
              </span>
            </button>
          </div>
          <div
            className={`cart cart-disabled`}
            onClick={(event) => {
              event.stopPropagation()
              setAddedToCart({ id, brand, model, price, imgUrl})
              // setAddedToCart(event, { id, model, price })
            }}
          ></div>
        </div>
      )}
    </div>
    ) 
}

