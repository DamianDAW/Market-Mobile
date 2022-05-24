// import { mobiles } from "../data/mobiles"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMobiles } from '../../services/getMobiles'

export const MobileByID = ( {num} ) => {

    const [ items, setItems ] = useState([])
    const [ loading, setLoading ] = useState(false)


    const navigate = useNavigate()
   
    const handleReturn = () => {
       navigate(-1)
    }
     
    useEffect(() => {   
      setLoading(true)    
      getMobiles().then(mobile => setItems(mobile))  
        .catch((e) => {
          console.error(e)
       })
       .finally(() => {
         setLoading(false)
       })   
    }, [])
      
  // console.log(loading);
  // console.log(items);
 
  const filterItem = items.filter((item) => item.id === num)
  const [ mobile ] = filterItem

  const {id, brand, model, price, imgUrl} = mobile

  
  const render = (
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

  return (
    <>
    {loading
        ? 'Loading...'
        : render
    } 
    
    </>
  )   


}