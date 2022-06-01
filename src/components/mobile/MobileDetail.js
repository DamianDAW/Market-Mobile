import { useParams, useNavigate } from 'react-router-dom'
import { useSingleMobile } from '../../hooks/useSingleMobile'
import { useFavoriteMobile } from '../../hooks/useFavoriteMobile'
import { Spinner } from '../spinner/Spinner'
import './MobileDetail.css'

export const MobileDetail = () => {

  const params = useParams()
  const navigate = useNavigate()   
  const handleReturn = () => {
     navigate(-1)
  }

  const [mobile, notFoundMobile] = useSingleMobile(params.id) // Hook sustituye a getmobile con el useEffect
  const [isFavorite, changeFav] = useFavoriteMobile(mobile)
  const {id, brand, model, price, imgUrl} = mobile

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
      <div className='infoRow'>
        <div className='col-left'>
          <img src={imgUrl} alt={model} className='img-thumbnail' />    
        </div>
        <div className="favorite-icon-detail">
          <button 
            onClick={changeFav}  
            >
              {(isFavorite) ? 'Remove from wishlist' : 'Add to wishlist'}
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

