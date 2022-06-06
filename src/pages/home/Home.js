import { useState, useEffect } from "react";
import { MobileList } from "../_components/MobileList/MobileList";
import { getMobiles } from '../../services/getMobiles'
import { FiSearch } from 'react-icons/fi'
import './Home.css'


export const Home = () => { 
   
  const [ filterSearch, setfilterSearch ] = useState('');
  const [ mobiles, setMobiles ] = useState([])



  const getFilteredMobile = () => {
    const filteredMobile = mobiles.filter(
      mobile => 
        mobile.model.toLowerCase().includes(filterSearch.toLowerCase()) || 
        mobile.brand.toLowerCase().includes(filterSearch.toLowerCase()) 
    )    
    if(filteredMobile.length === 0) {
      return false
    }
    return filteredMobile  
    }

  useEffect(() => {  
    getMobiles().then(mobiles => setMobiles(mobiles))
    }, [])

  const handleSearch= (event) => {
    setfilterSearch(event.target.value)
  }

  return (
    <div>
      <div className="search-div">
        {/* <h4>Filter</h4>
        <hr/> */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Filter search..."  
            autoComplete="off"
            onChange={handleSearch}
          />
          <a href='##' className="icon">
            <i className=""><FiSearch style={{size: "1rem"}}/></i>
          </a>
        </div>
      </div>
    
      <div className="result-div">
        <h4>Results</h4>
          <hr/>
      </div>         
        {
         getFilteredMobile() 
         ? <MobileList mobiles={getFilteredMobile()}  />
         : (
            <span>The item searched doesn't exists</span>                 
          )    
        }
      </div>  
  )
  
}
