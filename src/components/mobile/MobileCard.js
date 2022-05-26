import { Link, useNavigate } from 'react-router-dom'
import './MobileCard.css'

export const MobileCard = ({brand, model, price, img, id}) => {

  const navigate = useNavigate()
  const redirectClickOnCard = () => {
    navigate(`/mobiles/${id}`)        
  }

  return (
    <div className="mobileCard" onClick={redirectClickOnCard}>   
      <div className="mobileCard-img">
        <img src={img}  alt ={model} />
      </div>
      <h5 className='mobileCard-title'>{brand}</h5>
      <div className='elipsis'>
      <h4 className='mobileCard-model'>{model}</h4>        
      </div>
      <Link className='mobileCard-link' to={`/mobiles/${id}`}>
        <span className='mobileCard-span'>More info...</span>
      </Link>           
    </div> 
   
  )
}
