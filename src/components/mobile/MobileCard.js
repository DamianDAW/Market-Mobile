import { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import { Link, useNavigate } from 'react-router-dom'
import { getMobiles } from '../../services/getMobiles'
import { FavoriteMobile } from '../favorites/FavoriteMobile'
import './MobileCard.css'

export const MobileCard = ({brand, model, price, img, id}) => {

  
  const navigate = useNavigate()
  const redirectClickOnCard = () => {
    navigate(`/mobiles/${id}`)        
  }

  const [mobiles, setMobiles ] = useState([])

  useEffect(() => {  
    getMobiles()
      .then(mobiles => setMobiles(mobiles))
      .catch((e) => {
        console.error(e)
      })      
    }, [])
  
   

    if(mobiles.length === 0 ) {
      return (
        <Spinner animation="grow" variant="dark" size="sm"/>
      ) 
  
    } else {
        

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
      <FavoriteMobile id={id} brand={brand} model={model} />
    </div> 
   
  )

    }
}


// useEffect(() => {  
//   getMobiles().then(mobiles => setMobiles(mobiles))
//   }, [])