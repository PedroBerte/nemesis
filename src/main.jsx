import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import SignUpContextProvider from "./contexts/SignUpContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SignUpContextProvider>
        <App />
      </SignUpContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
