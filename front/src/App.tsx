// App.js
import React from 'react';
import {  Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './page/Home/Home';
import Login from './page/auth/Login';
import Register from './page/auth/Register';
import { useAppContext } from "./context/AppContext";

const App: React.FC = () => {
  const { user } = useAppContext();


  return (

    
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
           <Route path="/"  element={<Home />} /> 
        </Routes>

  
  );
};

export default App;





