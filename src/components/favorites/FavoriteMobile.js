import { useState } from "react"
import { useParams } from "react-router-dom"
import './FavoriteMobile.css'

export const FavoriteMobile = () => {
  const [ addFav, setAddFav ] = useState(0)
  const [ hover, setHover ] = useState(0)

  const params = useParams()

  if(typeof params.id === 'undefined') 
  return (
    <div className="favorite-icon">
      <button
        type="button"
        className={(addFav || hover) ? "on" : "off"}
        onClick={()=> setAddFav(1)}  
        onDoubleClick={() => {
          setAddFav(0)
        }}
        onMouseEnter={() => setHover(1)}
        onMouseLeave={() => setHover(0)}
      >
        <i className="star">&#9733;</i>
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