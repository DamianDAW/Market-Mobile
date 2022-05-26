import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMobiles } from '../../services/getMobiles'
import Spinner from 'react-bootstrap/Spinner'
import './MobileDetail.css'

export const MobileDetail = () => {
  const params = useParams()
  // console.log(params);

  const [ mobile, setMobile ] = useState([])

  const navigate = useNavigate()   
  const handleReturn = () => {
     navigate(-1)
  }

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
    
  // console.log(mobile);       

  const {id, brand, model, price, imgUrl} = mobile

  if(mobile.length === 0 ) {
    return (
      <Spinner animation="grow" variant="dark" size="sm"/>
    ) 

  } else {
      
    return (   
      <div className='infoRow'>
        <div className='col-left'>
          <img src={imgUrl} alt={model} className='img-thumbnail' />
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

