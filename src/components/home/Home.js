import { useState, useEffect } from "react";
import { MobileList } from "../mobile/MobileList";
import { getMobiles } from '../../services/getMobiles'
import './Home.css'

export const Home = () => { 
   
  const [ filterSearch, setfilterSearch ] = useState('');
  const [ mobiles, setMobiles ] = useState([])

  
  const getFilteredMobile = () => {
    return mobiles.filter(
      mobile => 
        mobile.model.toLowerCase().includes(filterSearch.toLowerCase()) || 
        mobile.brand.toLowerCase().includes(filterSearch.toLowerCase()) 
    )    
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
            onChange={handleSearch}
          />
      </div>

      <div>     
        <div>
        <h4>Results</h4>
          <hr/>
        </div> 
        <MobileList mobiles={getFilteredMobile()}  />
      </div>  
    </div>
  )
  
}