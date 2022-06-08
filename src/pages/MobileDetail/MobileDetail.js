import { useParams, useNavigate } from 'react-router-dom'
import { useSingleMobile } from './hooks/useSingleMobile'
import { useFavoriteMobile } from '../../hooks/useFavoriteMobile'
import { Spinner } from './components/Spinner/Spinner'
import './MobileDetail.css'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'

export const MobileDetail = () => {

  const params = useParams()
  const navigate = useNavigate()   
  const handleClickReturn = () => {
     navigate("/mobiles")
  }

  const [mobile, notFoundMobile] = useSingleMobile(params.id) // Hook sustituye a getmobile con el useEffect
  const [isFavorite, changeFav] = useFavoriteMobile(mobile)
  const{userData, setAddedToCart} = useContext(AppContext)
  const {id, brand, model, price, imgUrl} = mobile

  const handleAddToCart = () => {
    setAddedToCart(mobile)
  }

  if(notFoundMobile) {
    return navigate("/")
  }  

  if(mobile.length === 0 ) {
    return (
      <div className='center'>
          <Spinner />
      </div>          
    ) 
  } else {   

    return (   
      <>      
        <div className="redirect mt-4" onClick={handleClickReturn}>
        <div className="redirect-text">
          <h4>&#60; Return</h4>
        </div>
        </div>
        <div className='infoRow'>
          <div className='col-left'>
            <img src={imgUrl} alt={model} className='img-thumbnail animate__animated animate__fadeInLeft' />    
          </div>
          {
            (userData.isLogged)
            ?
              <div className="favorite-icon-detail">
                <button 
                  onClick={changeFav}  
                  >
                    {(isFavorite) ? 'Remove from wishlist' : 'Add to wishlist'}
                </button>       
              </div>
            :
            <></>
          }
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
            {
            (userData.isLogged)
            ?
            <button className='button' onClick={handleAddToCart}>
              Add to cart
            </button>
            :
            <></>
          }
           
          </div>      
        </div>       
      </>  
            
    )
  } 

}

