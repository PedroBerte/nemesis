import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import StartPage from "./Pages/StartPage/StartPage";
import UserPage from "./Pages/UserPage/UserPage";
import UserSettings from "./Pages/UserSettings/UserSettings";

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/UserSettings" element={<UserSettings />} />
        <Route path="/UserPage" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
