import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./components/home/Home";
import { MobileDetail } from "./components/mobile/MobileDetail";
import { FavList } from "./components/favorites/FavList"
import { Navbar } from "./components/ui/Navbar";


export const App = () => {
  return(
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mobiles" element={<Home />} />
          <Route path="/mobiles/:id" element={<MobileDetail />} />
          <Route path="/list" element={<FavList />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}