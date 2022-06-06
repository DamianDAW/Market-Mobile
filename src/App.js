import React, { useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { MobileDetail } from "./pages/MobileDetail/MobileDetail";
import { FavList } from "./pages/FavList/FavList";
import { Navbar } from "./components/Navbar/Navbar";
import AppContext from "./context/AppContext";
import { Login } from "./pages/Login/Login";

export const App = () => {
  const [favorites, setFavorites] = useState(() => {
    const data = window.localStorage.getItem("fav-mobile-list");
    if (data) {
      return JSON.parse(data);
    }
    return [];
  });

  const [userInfo, setUserInfo] = useState(() => {
    const data = window.localStorage.getItem("userInfo");
    if (data) {
      return JSON.parse(data);
    }
    return {};
  });
  const [carrito, setCarrito] = useState(() => {
    const data = window.localStorage.getItem("carrito");
    if (data) {
      return JSON.parse(data);
    }
    return {
      productos: [],
      total: 0,
    };
  });

  const handleSetUserInfo = (userInfo) => {
    setUserInfo(userInfo);
    window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
  };

  const handleSetFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    window.localStorage.setItem(
      "fav-mobile-list",
      JSON.stringify(newFavorites)
    );
  };

  const handleSetCarrito = ({ id, model, price }) => {
    const isProductRepeated = carrito.productos.find(
      (producto) => producto.id === id
    );
    let newCarrito;
    if (isProductRepeated) {
      isProductRepeated.amount++;
      isProductRepeated.total =
        isProductRepeated.total + isProductRepeated.price;

      newCarrito = {
        productos: [...carrito.productos, isProductRepeated],
        total: carrito.total + price,
      };
    } else {
      newCarrito = {
        productos: [
          ...carrito.productos,
          { id, model, price, amount: 1, total: price },
        ],
        total: carrito.total + price,
      };
    }
    setCarrito(newCarrito);
  };

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          favorites: favorites,
          setFavorites: handleSetFavorites,
          userInfo,
          setUserInfo: handleSetUserInfo,
          carrito,
          setCarrito: handleSetCarrito,
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
                !userInfo.isLogged ? (
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
                userInfo.isLogged ? (
                  <FavList />
                ) : (
                  <Navigate to="/mobiles" replace />
                )
              }
            />
          </Routes>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
};
