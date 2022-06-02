import { useState, useEffect } from "react";
import { MobileList } from "../_components/MobileList/MobileList";
import { getMobiles } from '../../services/getMobiles'
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
      <div >
        <h4>Filter</h4>
        <hr/>
          <input
            type="text"
            placeholder="Filter search..."
            className="form-control mb-4"
            name="filterText"
            autoComplete="off"
            onChange={handleSearch}
          />
      </div>
    
      <div>
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