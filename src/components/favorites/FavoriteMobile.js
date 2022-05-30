import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './FavoriteMobile.css'


export const FavoriteMobile = ({id, brand, model}) => {

  const [ listFav, setListFav ] = useState([])
  const [ addFav, setAddFav ] = useState(false)
  const [ hover, setHover ] = useState(false)

  const params = useParams()

  useEffect(() => {
    const data = window.localStorage.getItem('fav-mobile-list')
    if(data) {
      setListFav(JSON.parse(data))      
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('fav-mobile-list', JSON.stringify(listFav))
    console.log(listFav);
  }, [listFav])


if(typeof params.id === 'undefined') 
  return (
    <div className="favorite-icon">
      <button
        type="button"
        className={(addFav || hover) ? "on" : "off"}
        onClick={()=> {
          setListFav([ 
            ...listFav,           
            {
              id, 
              brand,
              model
            }                      
          ])
          
          setAddFav(true)
        }}  
        onDoubleClick={() => {
          setAddFav(false)
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span aria-label="Fav Mobile" role='img' className="star">&#9733;</span>
      </button>
    </div>
  )

  
  return (
      <div className="favorite-icon-detail">
          <button 
            className={ addFav ? "on-detail" : "off-detail"}
            onClick={()=> setAddFav(1)}  
            onDoubleClick={() => {
            setAddFav(0)
            }}>
            Add to wishlist
          </button>       
      </div>
  )

}




