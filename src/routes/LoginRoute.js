// import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import { AppRoute } from './AppRoute';


export const LoginRoute = () => {

  return (
    <>   
      <BrowserRouter>            
        <Routes>                
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<AppRoute />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
