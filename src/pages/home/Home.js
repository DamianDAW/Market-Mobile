import { useState, useEffect, useContext } from "react";
import { MobileList } from "../_components/MobileList/MobileList";
import { getMobiles } from '../../services/getMobiles'
import { FiSearch } from 'react-icons/fi'
import './Home.css'
import AppContext from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";


export const Home = () => { 
   
  const [ filterSearch, setfilterSearch ] = useState('');
  const [ mobiles, setMobiles ] = useState([])
  const{userData} = useContext(AppContext)

  const navigate = useNavigate()   
  const handleClickHome = () => {
    return navigate('/mobiles/favorites')
  }


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
         <div className="footer-basic">
          <footer>          
              {
                userData.isLogged ?
                <ul className="list-inline">
                  <li className="list-inline-item">
                  <Link                  
                    to="/mobiles"
                    >
                    <span>Home</span>
                  </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link                  
                      to="/mobiles/favorites"
                      >
                      <span>Favorites</span>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <a href="##">Cart</a>
                  </li>                
                </ul>
                :
                <ul className="list-inline">
                  <li className="list-inline-item">
                  <Link                  
                      to="/mobiles"
                      >
                      <span>Home</span>
                    </Link>
                  </li>                  
                </ul>
              }
              <p className="copyright">Market Mobile © 2022</p>
          </footer>
        </div>
      </div>  
  )
  
}
