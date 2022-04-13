import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginScreen from "./Pages/Login/Login";
import RegisterScreen from "./Pages/Register/Register";
import StartPage from "./Pages/StartPage/StartPage";

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/Login" element={<LoginScreen />} />
      <Route path="/Register" element={<RegisterScreen />} />
    </Routes>
  );
};

export default routes;
