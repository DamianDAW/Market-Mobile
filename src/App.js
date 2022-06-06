import React, { useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { MobileDetail } from "./pages/MobileDetail/MobileDetail";
import { FavList } from "./pages/FavList/FavList"
import { Navbar } from "./components/Navbar/Navbar";
import { Login } from './pages/Login/Login';
import { Cart } from './pages/Cart/Cart'
import AppContext from './context/AppContext';

export const App = () => {

  const [ favorites, setFavorites ] = useState(() => {
    const data = window.localStorage.getItem('fav-mobile-list')
      if(data) {
      return JSON.parse(data)   
      } 
      return[]          
    })

  const [userData, setUserData] = useState(() => {
    const data = window.localStorage.getItem('userData')
    if(data) {
      return JSON.parse(data) 
    } 
    return {}
  })

 
  const [ addedToCart, setAddedToCart ] = useState(() => {
    const data = window.localStorage.getItem('cart-added-mobiles')
      if(data) {
      return JSON.parse(data)   
      } 
      return {
        items: [],
        total: 0,
      };      
    }) 

    
  
  const handleSetFavorites= (newFavorites) => {
    setFavorites(newFavorites)
    window.localStorage.setItem(
        'fav-mobile-list', 
        JSON.stringify(newFavorites)
    )}

  const handleSetUserData = (userData) => {
    setUserData(userData);
    window.localStorage.setItem("userData", JSON.stringify(userData));
  }

    
  const handleAddToCart = ({ id, brand, model, price, imgUrl }) => {
      
      const isItemRepeated = addedToCart.items.find(item => item.id === id)
      let newCart
      if(isItemRepeated) {
        isItemRepeated.amount++
        isItemRepeated.total = isItemRepeated.total + Number(isItemRepeated.price)

        newCart = {
            items: [...addedToCart.items, isItemRepeated],
            total: addedToCart.total + Number(price),
        } 
        
        } else {
        newCart = {
          items: [
            ...addedToCart.items,
            { id, brand, model, price, amount: 1, total:  Number(price), imgUrl },
          ],
          total: addedToCart.total + Number(price),
        }
      }
      setAddedToCart(newCart);
      window.localStorage.setItem("cart-added-mobiles", JSON.stringify(addedToCart));
    }


  return(
    <BrowserRouter>
        <AppContext.Provider
        value={{
            favorites: favorites,
            setFavorites: handleSetFavorites,
            userData,
            setUserData: handleSetUserData,
            addedToCart,
            setAddedToCart: handleAddToCart,
        }}
        >
        <Navbar />
        <div className="container">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mobiles" element={<Home />} />
            <Route
              exact
              path="mobiles/login"
              element={
                  !userData.isLogged ? (
                      <Login />
                  ) : (
                      <Navigate to="/mobiles" replace />
                  )
              }
            />
            <Route path="/mobiles/:id" element={<MobileDetail />} />

            <Route
                path="/mobiles/favorites"
                element={
                userData.isLogged ? (
                    <FavList />
                ) : (
                    <Navigate to="/mobiles" replace />
                )
                }
            />
             <Route
                path="/mobiles/cart"
                element={
                userData.isLogged ? (
                    <Cart />
                ) : (
                    <Navigate to="/mobiles" replace />
                )
                }
            />
        </Routes>
        </div>
        </AppContext.Provider>
    </BrowserRouter>
  )
}