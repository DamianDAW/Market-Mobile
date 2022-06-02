import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { MobileDetail } from "../pages/MobileDetail/MobileDetail";
import { FavList } from "../pages/FavList/FavList"
import { Navbar } from "../components/Navbar/Navbar";
import FavContext from '../context/FavContext';
import AuthContext from '../context/AuthContext';

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

  
  const handleSetFavorites= (newFavorites) => {
    setFavorites(newFavorites)
    window.localStorage.setItem('fav-mobile-list', JSON.stringify(newFavorites))   
  }

  return(
    <>
    <FavContext.Provider value={{ favorites: favorites, setFavorites: handleSetFavorites }}>
    <AuthContext.Provider value={user} >
      <Navbar />
      <div className="container">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/mobiles" element={<Home />} />
          <Route path="/mobiles/:id" element={<MobileDetail />} />
          <Route path="/list" element={<FavList />} />
        </Routes>
      </div>
    </AuthContext.Provider>
    </FavContext.Provider>

    </>
  )
}