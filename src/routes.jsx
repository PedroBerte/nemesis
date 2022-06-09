import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import LoginScreen from "./Pages/Login/Login";
import RegisterScreen from "./Pages/Register/Register";
import StartPage from "./Pages/StartPage/StartPage";
import UserSettings from "./Pages/UserSettings/UserSettings";

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/Login" element={<LoginScreen />} />
        <Route path="/Register" element={<RegisterScreen />} />
        <Route path="/UserSettings" element={<UserSettings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
