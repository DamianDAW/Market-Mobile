import {useState, useEffect} from 'react'
import { getMobiles } from '../../../../../services/getMobiles'

export const  useSingleMobile = (id) => {
    
  const [mobile, setMobile]= useState([])
  const [ notFoundMobile, setNotFoundMobile ] = useState(false)

  useEffect(() => {   
    getMobiles()
      .then(mobiles => {
        const filteredMobileById = mobiles.find((item) => item.id === id)   
        if(typeof filteredMobileById !== 'undefined') {
          setMobile(filteredMobileById)             
        } else {
          setNotFoundMobile(true)
        }
      })  
      .catch((error) => {
        console.error(error)
      })      
  }, [])

  return [mobile, notFoundMobile]
}