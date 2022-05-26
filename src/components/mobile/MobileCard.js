import { Link, useNavigate } from 'react-router-dom'
import { FavoriteMobile } from '../favorites/FavoriteMobile'
import './MobileCard.css'

export const MobileCard = ({brand, model, price, img, id}) => {

  const navigate = useNavigate()
  const redirectClickOnCard = () => {
    navigate(`/mobiles/${id}`)        
  }

  return (
    <div className="mobileCard">   
      <div className="mobileCard-img"  onClick={redirectClickOnCard}>
        <img src={img}  alt ={model} />
      </div>
      <h5 className='mobileCard-title'  onClick={redirectClickOnCard}>{brand}</h5>
      <div className='elipsis'  onClick={redirectClickOnCard}>
      <h4 className='mobileCard-model'>{model}</h4>        
      </div>
      <Link className='mobileCard-link' to={`/mobiles/${id}`}>
        <span className='mobileCard-span'>More info...</span>
      </Link>           
      <FavoriteMobile />
    </div> 
   
  )
}
