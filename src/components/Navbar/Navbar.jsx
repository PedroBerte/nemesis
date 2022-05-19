import "./Navbar.css";
import React, { useContext, useEffect } from "react";
import Logo from "./../../images/NemesisV1.1.png";
import Button from "./../Button/Button";
import menuIcon from "./../../images/menuIcon.png";

import { db } from "../../firebase-config";
import { getDocs, getFirestore } from "firebase/firestore";
import { auth } from "./../../firebase-config";

import { signOut } from "firebase/auth/";

import { AuthContext } from "./../../contexts/AuthContext";

import { Link } from "react-router-dom";
const Navbar = () => {
  var isShowed = false;

  const { user, setUser, userInformation, setUserInformation } =
    useContext(AuthContext);

  const logOut = async () => {
    signOut(auth);
  };

  const showResponsiveMenu = () => {
    if (!isShowed) {
      document.getElementById("responsive-menu").style.visibility = "visible";
      document.getElementById("responsive-menu").style.opacity = "100%";
      document.getElementById("responsive-menu").style.height = "100px";
      document.getElementById("navbar-body").style.boxShadow =
        "0px 3px 3px rgba(0, 0, 0, 0.25)";
      isShowed = true;
    } else {
      document.getElementById("responsive-menu").style.visibility = "hidden";
      document.getElementById("responsive-menu").style.opacity = "0%";
      document.getElementById("responsive-menu").style.height = "0px";
      document.getElementById("navbar-body").style.boxShadow = "none";
      isShowed = false;
    }
  };

  return (
    <div className="navbar-body" id="navbar-body">
      <div className="navbar-flex">
        <div className="navbar-left-side">
          <img src={Logo} height="65px" alt="" />
        </div>
        {user != undefined ? (
          <div className="navbar-right-side-logged">
            <div className="navbar-logged-texts">
              <h4>{userInformation.name.stringValue}</h4>
              <h5>{user.email}</h5>
              <Button
                onClick={() => logOut()}
                background="#45c4b0"
                color="white"
                height="40px"
                shadow="2px 6px 4px rgba(0, 0, 0, 0.25)"
              >
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <div className="navbar-right-side">
            <Link to="/Register">
              <Button background="#45c4b0" color="white">
                Cadastre-se
              </Button>
            </Link>
            <Link to="/Login">
              <a href="">Fazer Login</a>
            </Link>
          </div>
        )}

        <div className="navbar-right-side-responsive">
          <img onClick={showResponsiveMenu} src={menuIcon} alt="" />
        </div>
      </div>

      <div id="responsive-menu" className="responsive-menu">
        <Link to="/Register">
          <Button
            className="button-menu-responsive"
            background="#45c4b0"
            color="white"
          >
            Cadastre-se
          </Button>
        </Link>
        <Link to="/Login">
          <Button
            className="button-menu-responsive"
            background="#9AEBA3"
            color="white"
          >
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
