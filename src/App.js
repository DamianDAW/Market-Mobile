// import React, { useState } from 'react';
// import { Routes, Route, BrowserRouter } from "react-router-dom";
// import { Home } from "./pages/home/Home";
// import { MobileDetail } from "./pages/MobileDetail/MobileDetail";
// import { FavList } from "./pages/FavList/FavList"
// import { Navbar } from "./components/Navbar/Navbar";
// import FavContext from './context/FavContext';

// export const App = () => {

//   const [ favorites, setFavorites ] = useState(() => {
//     const data = window.localStorage.getItem('fav-mobile-list')
//       if(data) {
//       return JSON.parse(data)   
//       } 
//       return[]          
//     }
//   )

//   const handleSetFavorites= (newFavorites) => {
//     setFavorites(newFavorites)
//     window.localStorage.setItem('fav-mobile-list', JSON.stringify(newFavorites))   
//   }

//   return(
//     <BrowserRouter>
//     <FavContext.Provider value={{ favorites: favorites, setFavorites: handleSetFavorites }}>
//       <Navbar />
//       <div className="container">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/mobiles" element={<Home />} />
//           <Route path="/mobiles/:id" element={<MobileDetail />} />
//           <Route path="/list" element={<FavList />} />
//         </Routes>
//       </div>
//     </FavContext.Provider>
//     </BrowserRouter>
//   )
// }


import { LoginRoute } from './routes/LoginRoute';


export const App = () => {
    return (
        <LoginRoute />
    )
}