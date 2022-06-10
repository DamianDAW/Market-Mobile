import React, { useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { MobileDetail } from "./pages/MobileDetail/MobileDetail";
import { FavList } from "./pages/FavList/FavList"
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from './components/Footer/Footer'
import { Login } from './pages/Login/Login';
import AppContext from './context/AppContext';
import './App.css'

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

 
  const [ shoppingCart, setShoppingCart ] = useState(() => {
    const data = window.localStorage.getItem('shoppingCart')
      if(data) {
      return JSON.parse(data)   
      } 
      return {
        products: [],
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


    const isProductRepeated = shoppingCart.products.find(item => item.id === id)
    let newCart
    if(isProductRepeated) {
      /**find hace referencia al elemento encontrado en el array y lo actualiza*/
      isProductRepeated.amount++     
      shoppingCart.total = shoppingCart.total + Number(isProductRepeated.price)

      newCart = {
          products: [...shoppingCart.products],
          total: shoppingCart.total + Number(price),
      } 
      
      } else {
        newCart = {
          products: [
            ...shoppingCart.products,
            { id, brand, model, price, amount: 1, total:  Number(price), imgUrl },
          ],
          total: shoppingCart.total + Number(price),
        }
      }
    setShoppingCart(newCart)
    window.localStorage.setItem("shoppingCart", JSON.stringify(newCart))  
  
  }


  return(        
    <BrowserRouter>
      <AppContext.Provider
      value={{
          favorites: favorites,
          setFavorites: handleSetFavorites,
          userData,
          setUserData: handleSetUserData,
          shoppingCart: shoppingCart,
          setShoppingCart: handleAddToCart,      
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
          
      </Routes>
      </div>
      <Footer />
      </AppContext.Provider>
    </BrowserRouter>
  )
}