import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMobiles } from '../../services/getMobiles'
import Spinner from 'react-bootstrap/Spinner'

export const DetailMobile = () => {
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
  }, [params.id])
    
  console.log(mobile);       

  const {id, brand, model, price, imgUrl} = mobile

  if(mobile.length === 0 ) {
    return (
      <Spinner animation="grow" variant="dark" size="sm"/>
    ) 

  } else {
      
    return (   
      <div className='row mt-5'>
        <div className='col-4'>
          <img src={imgUrl} alt={model} className='img-thumbnail' />
        </div>
        <div className='col-8'>
          <h3>{model}</h3>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'><b>Brand:</b> {brand}</li>
            <li className='list-group-item'><b>Id:</b> {id}</li>
            <li className='list-group-item'><b>Price:</b> {price}€</li>
          </ul>
  
          <button className='btn btn-outline-info mt-3' onClick={handleReturn}>
            Return
          </button>
        </div>      
      </div>            
    )
  } 

}