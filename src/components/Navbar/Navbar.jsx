import "./Navbar.css";
import React, { useContext, useEffect, useState } from "react";
import Logo from "./../../images/NemesisV1.1.png";
import Button from "./../Button/Button";
import menuIcon from "./../../images/menuIcon.png";

import { db } from "../../firebase-config";
import { auth } from "./../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

import { signOut } from "firebase/auth/";
import { collection, getDocs } from "firebase/firestore";

import { AuthContext } from "./../../contexts/AuthContext";

import { Link } from "react-router-dom";
import { async } from "@firebase/util";
const Navbar = () => {
  var isShowed = false;

  const { user, setUser, userInformation, setUserInformation } =
    useContext(AuthContext);
  const userCollectionRef = collection(db, "users");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  const logOut = async () => {
    signOut(auth);
    setUser();
    setUserInformation();
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

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    async function getUserDocs() {
      if (user != undefined) {
        const data = await getDocs(userCollectionRef);
        const UserInfos = data.docs.find((element) => element.id == user.uid);
        setName(
          UserInfos._document.data.value.mapValue.fields.name.stringValue
        );
        setGoal(
          UserInfos._document.data.value.mapValue.fields.goal.stringValue
        );
        setUserInformation(UserInfos);
      }
    }
    getUserDocs();
  }, [user]);

  return (
    <div className="navbar-body" id="navbar-body">
      <div className="navbar-flex">
        <div className="navbar-left-side">
          <img src={Logo} height="65px" alt="" />
        </div>
        {user != undefined ? (
          <div className="navbar-right-side-logged">
            <div className="navbar-logged-texts">
              <h3>{name}</h3>
              {goal == "G" ? (
                <h4>Ganhando massa 💪</h4>
              ) : (
                <h4>Perdendo Peso 🏃</h4>
              )}
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
              <span href="">Fazer Login</span>
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
