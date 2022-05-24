
// import { useParams, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
// import { getMobileById } from '../../selector/getMobileById'
import { MobileByID } from '../select/MobileByID'

export const MobileScreen = () => {
  const params = useParams()
  // const navigate = useNavigate()
  // console.log(params.id);
  
  // const mobile = getMobileById(params.id)
  // const {brand, model, price, imgUrl, id} = mobile

  
  
  // const handleReturn = () => {
  //    navigate(-1)
  // }
 

  return (
   
    <MobileByID num={params.id} />
    // <div className='row mt-5'>
    //   <div className='col-4'>
    //     <img src={imgUrl} alt={model} className='img-thumbnail' />
    //   </div>
    //   <div className='col-8'>
    //     <h3>{model}</h3>
    //     <ul className='list-group list-group-flush'>
    //       <li className='list-group-item'><b>Brand:</b> {brand}</li>
    //       <li className='list-group-item'><b>Id:</b> {id}</li>
    //       <li className='list-group-item'><b>Price:</b> {price}€</li>
    //     </ul>

    //     <button className='btn btn-outline-info mt-3' onClick={handleReturn}>
    //       Return
    //     </button>
    //   </div>
   
      
    // </div>
    
   
  )
}