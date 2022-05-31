import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { getMobiles } from '../services/getMobiles'

export const  useSingleMobile = (id) => {

  const navigate = useNavigate()   
  
  const [mobile, setMobile]= useState([])
 console.log(mobile);

  useEffect(() => {   
    getMobiles()
      .then(mobiles => {
        const filteredMobileById = mobiles.find((item) => item.id === id)
        setMobile(filteredMobileById)   
      })  
      .catch((e) => {
        console.error(e)
        console.log(e.error.code);
      })      
  }, [])

  if(!mobile) {
     return navigate('/')      
  }


  return [mobile]
}