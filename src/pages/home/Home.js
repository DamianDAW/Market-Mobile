import { useState, useEffect } from "react";
import { MobileList } from "../_components/MobileList/MobileList";
import { getMobiles } from '../../services/getMobiles'
import { FiSearch } from 'react-icons/fi'
import { Spinner } from "../../components/Spinner/Spinner";
import './Home.css'


export const Home = () => { 
   
  const [ filterSearch, setfilterSearch ] = useState('');
  const [ mobiles, setMobiles ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  useEffect(() => {  
    getMobiles().then(mobiles => {
      setMobiles(mobiles)
      setIsLoading(false)
    })
  }, [])
  const handleSearch= (event) => {
    setfilterSearch(event.target.value)    
  }
  const getFilteredMobile = () => {
    const filteredMobile = mobiles.filter(
      mobile => 
        mobile.model.toLowerCase().includes(filterSearch.toLowerCase()) || 
        mobile.brand.toLowerCase().includes(filterSearch.toLowerCase()) 
    )   
    if(filteredMobile.length === 0) {
      return []
    }
    return filteredMobile       
  }
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'  
    })
  }  
  return (
    <>   
    { isLoading ?
      <div className="container-spinner">
        <Spinner />
      </div>
    : <div>  
        <div className="search-div">
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
          getFilteredMobile().length > 0 
          ?                 
            <MobileList mobiles={getFilteredMobile()}  />
          :            
            <span>The item searched doesn't exists</span>                      
        }          
        <div className="scroll-button-container">
          <button
            className="button-up-scroll" 
            onClick={scrollToTop}>
          </button>         
        </div>     
      </div>    
      } 
    </>     
  )    
}