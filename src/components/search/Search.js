
import { useState } from "react";
import { mobiles } from "../../data/mobiles";
import { MobileList } from "../mobile/MobileList";


export const Search = () => {

  const [ search, setSearch ] = useState('');

  const searchMultiple = (data) => {
    return data.filter(
      mobile => 
        mobile.model.toLowerCase().includes(search.toLowerCase()) || 
        mobile.brand.toLowerCase().includes(search.toLowerCase())
    )
  }

  // console.log(mobiles.filter(mobile => mobile.model.toLocaleLowerCase().includes("liq")));


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
              placeholder="Filter search"
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