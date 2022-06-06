
import { useContext } from "react";
import AppContext from "../context/AppContext";


export const useFavoriteMobile = ({id, brand, model, price, imgUrl}) => {
 
  const { favorites, setFavorites } = useContext(AppContext)
  const isFavorite = favorites.some((favID) => favID.id === id)

  const changeFav = (event) => {
    event.stopPropagation()
    let newFavorites
    const isFavorite = (favorites.filter(favorite => favorite.id === id)).length > 0
    if(isFavorite) {
       newFavorites = favorites.filter(favorite => favorite.id !== id)
    } else {
       newFavorites = [...favorites, {id, brand, model, imgUrl, price}]
    }
    setFavorites(newFavorites)
    window.localStorage.setItem('fav-mobile-list', JSON.stringify(newFavorites))   

  }  
  return [isFavorite, changeFav]

}


