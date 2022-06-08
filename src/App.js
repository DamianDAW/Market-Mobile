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
  const [shoppingCart, setShoppingCart] = useState(() => {
    const data = window.localStorage.getItem("shoppingCart");
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

  const handleSetShoppingCart = ({ id, model, price }) => {
    const isProductRepeated = shoppingCart.productos.find(
      (producto) => producto.id === id
    );
    let newShoppingCart;
    if (isProductRepeated) {
      isProductRepeated.amount++;
      isProductRepeated.total =
        isProductRepeated.total + isProductRepeated.price;

      newShoppingCart = {
        productos: [...shoppingCart.productos, isProductRepeated],
        total: shoppingCart.total + price,
      };
    } else {
      newShoppingCart = {
        productos: [
          ...shoppingCart.productos,
          { id, model, price, amount: 1, total: price },
        ],
        total: shoppingCart.total + price,
      };
    }
    setShoppingCart(newShoppingCart);
  };

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          favorites: favorites,
          setFavorites: handleSetFavorites,
          userInfo,
          setUserInfo: handleSetUserInfo,
          shoppingCart,
          setShoppingCart: handleSetShoppingCart,
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
