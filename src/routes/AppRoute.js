import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { MobileDetail } from "../pages/MobileDetail/MobileDetail";
import { FavList } from "../pages/FavList/FavList"
import { Navbar } from "../components/Navbar/Navbar";
import FavContext from '../context/FavContext';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import { Cart } from '../pages/Cart/Cart';

export const AppRoute = () => {

  const [ favorites, setFavorites ] = useState(() => {
    const data = window.localStorage.getItem('fav-mobile-list')
      if(data) {
      return JSON.parse(data)   
      } 
      return[]          
    }
  )

  const [user, setUser] = useState(() => {
    const data = window.localStorage.getItem('user-data')
    if(data) {
      return JSON.parse(data) 
    } 
    return []
  })

 
  const [ addedToCart, setAddedToCart ] = useState(() => {
    const data = window.localStorage.getItem('cart-added-mobiles')
      if(data) {
      return JSON.parse(data)   
      } 
      return[]          
    }
  ) 

  
  const handleSetFavorites= (newFavorites) => {
    setFavorites(newFavorites)
    window.localStorage.setItem('fav-mobile-list', JSON.stringify(newFavorites))   
  }

    
  const handleAddCartMobiles = (newMobilesAdded) => {
    setAddedToCart(newMobilesAdded)
    window.localStorage.setItem('cart-added-mobiles', JSON.stringify(newMobilesAdded))   
  }

  return(
    <>
    <FavContext.Provider value={{ favorites: favorites, setFavorites: handleSetFavorites }}>
      <AuthContext.Provider value={user} >
        <CartContext.Provider value={{ addedToCart:addedToCart, setAddedToCart: handleAddCartMobiles}}>
        <Navbar />
        <div className="container">
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/mobiles" element={<Home />} />
            <Route path="/mobiles/:id" element={<MobileDetail />} />
            <Route path="/list" element={<FavList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        </CartContext.Provider>
      </AuthContext.Provider>
    </FavContext.Provider>

    </>
  )
}