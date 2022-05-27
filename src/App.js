import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import FavoritesMobile from "./components/favoritesMobile/FavoritesMobile";
import { Home } from "./components/home/Home";
import { MobileDetail } from "./components/mobile/MobileDetail";
import { Navbar } from "./components/ui/Navbar";
import FavoriteContext from "./context/FavoriteContext";

export const App = () => {
  const getFavoritesFromLocalStorage = () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos"));
    if (favoritos) {
      return favoritos;
    }
    return [];
  };

  const [favorites, setFavorites] = useState(() =>
    getFavoritesFromLocalStorage()
  );

  const handleSetFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem("favoritos", JSON.stringify(newFavorites));
  };

  return (
    <BrowserRouter>
      <FavoriteContext.Provider
        value={{ favorites: favorites, setFavorites: handleSetFavorites }}
      >
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mobiles" element={<Home />} />
            <Route path="/mobiles/:id" element={<MobileDetail />} />
            <Route path="/mobiles/favorites" element={<FavoritesMobile />} />
          </Routes>
        </div>
      </FavoriteContext.Provider>
    </BrowserRouter>
  );
};
