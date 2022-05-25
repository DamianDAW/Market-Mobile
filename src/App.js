import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomeScreen } from "./components/home/HomeScreen";
import { DetailMobile } from "./components/mobile/DetailMobile";
import { Navbar } from "./components/ui/Navbar";

export const App = () => {
  return(
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/mobiles" element={<HomeScreen />} />
          <Route path="/mobiles/:id" element={<DetailMobile />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}