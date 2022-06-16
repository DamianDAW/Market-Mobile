import React, {  useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { MobileDetail } from "./pages/MobileDetail/MobileDetail";
import { FavList } from "./pages/FavList/FavList"
import { Navbar } from "./components/Navbar/Navbar";
import { Login } from './pages/Login/Login';
import AppContext from './context/AppContext';
import { Footer } from './components/Footer/Footer';
import { useShoppingCart } from './hooks/useShoppingCart';

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

  const saveOnLocalStorage = (name, value)=>{
    window.localStorage.setItem(name, JSON.stringify(value))  
  }

  const handleSetFavorites= (newFavorites) => {
    setFavorites(newFavorites)
    saveOnLocalStorage( 'fav-mobile-list',newFavorites)
  }

  const handleSetUserData = (userData) => {
    setUserData(userData);
    saveOnLocalStorage("userData",userData)
  }

  const [shoppingCart, dispatch]= useShoppingCart();
  

  return(
    <BrowserRouter>
      <AppContext.Provider
      value={{
          favorites: favorites,
          setFavorites: handleSetFavorites,
          userData,
          setUserData: handleSetUserData,
          shoppingCart: shoppingCart,
          setShoppingCart: dispatch,  
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