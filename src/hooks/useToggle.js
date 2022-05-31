import { useContext, useState } from 'react'
import FavContext from '../context/FavContext'


export const useToggle = (id, brand, model, price, imgUrl) => {
  const { favorites, setFavorites } = useContext(FavContext)
  const favIDs = favorites.map(favorite => favorite.id)
  const [isFaved, setIsFaved ] = useState(() => {
    // const isNewFaved = favorites.some(favorite => favorite.id === id) 
    const isNewFaved = favIDs.some(favID => favID.id === id) 
    if(isNewFaved) {
     return true
    }
    return false    
  }
  )

  const toggle = (e) => {
    e.stopPropagation()
    let newFavorites
    const isFavorite = (favorites.filter(favorite => favorite.id === id)).length > 0
    if(isFavorite) {
       newFavorites = favorites.filter(favorite => favorite.id !== id)
    } else {
       newFavorites = [...favorites, {id, brand, model, imgUrl}]
    }
    setFavorites(newFavorites)
    window.localStorage.setItem('fav-mobile-list', JSON.stringify(newFavorites))   
    const isNewFaved = newFavorites.some(favId => favId.id === id)
    setIsFaved(isNewFaved)
    
  }  
  return [isFaved, toggle]

}