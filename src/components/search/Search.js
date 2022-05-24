
import { useState, useEffect } from "react";
// import { mobiles } from "../../data/mobiles";
import { MobileList } from "../mobile/MobileList";
import { getMobiles } from '../../services/getMobiles'


export const Search = () => {

  const [ search, setSearch ] = useState('');
  const [ mobiles, setMobiles ] = useState([])

  const searchMultiple = (data) => {
    return data.filter(
      mobile => 
        mobile.model.toLowerCase().includes(search.toLowerCase()) || 
        mobile.brand.toLowerCase().includes(search.toLowerCase())
    )
  }

  // console.log(mobiles.filter(mobile => mobile.model.toLocaleLowerCase().includes("liq")));
  useEffect(() => {  
    getMobiles().then(mobile => setMobiles(mobile))
    }, [])

  const handleSearch= (e) => {
    setSearch(e.target.value)
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
        <MobileList data={searchMultiple(mobiles)} />
      </div>  
    </div>
  )
}