import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import LoginScreen from "./Pages/Login/Login";
import RegisterScreen from "./Pages/Register/Register";
import StartPage from "./Pages/StartPage/StartPage";

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/Login" element={<LoginScreen />} />
        <Route path="/Register" element={<RegisterScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
