import { useState, useEffect } from "react";
import { MobileList } from "../mobile/MobileList";
import { getMobiles } from '../../services/getMobiles'

export const HomeScreen = () => { 
   
    const [ filterSearch, setfilterSearch ] = useState('');
    const [ mobiles, setMobiles ] = useState([])

    console.log(mobiles);
  
    const getFilteredMobile = () => {
      if(mobiles?.length > 0) {
        return mobiles.filter(
          mobile => 
            mobile.model.toLowerCase().includes(filterSearch.toLowerCase()) || 
            mobile.brand.toLowerCase().includes(filterSearch.toLowerCase()) 
        )
      }
    }
  
    useEffect(() => {  
      getMobiles().then(mobiles => setMobiles(mobiles))
      }, [])
  
    const handleSearch= (e) => {
      setfilterSearch(e.target.value)
    }
  
    return (
      <div>
        <div className="row">
          <div className="col-5 mt-3">
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
        </div>
  
        <div className="row">     
          <div className="col-12">
          <h4>Results</h4>
            <hr/>
          </div> 
          <MobileList data={getFilteredMobile()} />
        </div>  
      </div>
    )
  
  
}