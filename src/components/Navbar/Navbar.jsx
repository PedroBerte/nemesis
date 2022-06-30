import "./Navbar.css";
import React, { useContext, useEffect, useState } from "react";
import Logo from "./../../images/NemesisV1.1.png";
import Button from "./../Button/Button";
import menuIcon from "./../../images/menuIcon.png";
import perfilIcon from "./../../images/perfil-icon.png";
import perfilMenuIcon from "./../../images/perfilMenuIcon.png";
import closeIcon from "./../../images/closeIcon.png";
import gymIcon from "./../../images/gymIcon.svg";
import configIcon from "./../../images/configIcon.svg";

import { db } from "../../services/firebase-config";
import { auth } from "../../services/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

import { signOut } from "firebase/auth/";
import { collection, getDocs } from "firebase/firestore";

import { AuthContext } from "./../../contexts/AuthContext";

import { Link } from "react-router-dom";
import LineSpace from "../LineSpace/LineSpace";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Navbar = () => {
  var isShowed = false;
  var isPerfilMenuShowed = false;

  const { user, setUser, userInformation, setUserInformation } =
    useContext(AuthContext);
  const userCollectionRef = collection(db, "users");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  const logOut = async () => {
    setUser();
    setUserInformation();
    await signOut(auth);
    location.reload();
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

  const showPerfilMenu = () => {
    if (!isPerfilMenuShowed) {
      document.getElementById("lateral-menu-body").style.width = "350px";
      document.getElementById("shadow-box").style.width = "100%";
      document.getElementById("shadow-box").style.opacity = "100%";
      isPerfilMenuShowed = true;
    } else {
      document.getElementById("lateral-menu-body").style.width = "0px";
      document.getElementById("shadow-box").style.opacity = "0%";
      setTimeout(() => {
        document.getElementById("shadow-box").style.width = "0%";
      }, 500);

      isPerfilMenuShowed = false;
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
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
    <>
      <div
        onClick={() => showPerfilMenu()}
        id="shadow-box"
        className="shadow-box"
      ></div>
      <div id="lateral-menu-body" className="lateral-menu-body">
        <div className="lateral-menu-user">
          <img src={perfilIcon} width="60px" />
          <div className="lateral-menu-logged-texts">
            <p className="navbar-username">{name}</p>
            {goal == "G" ? (
              <p className="navbar-goal">Ficando Fortão! 💪</p>
            ) : (
              <p className="navbar-goal">Perdendo Peso! 🏃</p>
            )}
          </div>
          <img
            onClick={() => showPerfilMenu()}
            src={closeIcon}
            className="img-perfil-menu-icon"
            alt=""
          />
        </div>
        <LineSpace width="280px" margin="1.5rem" />
        <ul className="lateral-menu-list">
          <li className="lateral-menu-list-item">
            <img width="27px" src={gymIcon} alt="" />
            <Link to="/UserPage">
              <p>Treino e Estatísticas</p>
            </Link>
          </li>
          <li className="lateral-menu-list-item">
            <img width="27px" src={configIcon} alt="" />
            <Link to="/UserSettings">
              <p>Configurações da Conta</p>
            </Link>
          </li>
        </ul>
        <Button
          id="button-lateral-menu-logout"
          type="warning"
          color="white"
          onClick={() => logOut()}
        >
          Deslogar
        </Button>
      </div>

      <div className="navbar-body" id="navbar-body">
        <div className="navbar-flex">
          <div className="navbar-left-side">
            <Link to="/">
              <img src={Logo} height="65px" alt="" />
            </Link>
          </div>
          {user != undefined ? (
            <div className="navbar-right-side-logged">
              <div className="navbar-logged-texts">
                {name == "" ? (
                  <>
                    <Skeleton
                      style={{ marginBottom: "7px" }}
                      width="180px"
                      height="1rem"
                    />
                    <Skeleton
                      style={{ marginBottom: "7px" }}
                      width="180px"
                      height="0.8rem"
                    />
                  </>
                ) : (
                  <>
                    <p className="navbar-username">{name}</p>
                    {goal == "G" ? (
                      <p className="navbar-goal">Ficando Fortão! 💪</p>
                    ) : (
                      <p className="navbar-goal">Perdendo Peso! 🏃</p>
                    )}
                  </>
                )}
              </div>
              {name == "" ? (
                <Skeleton height="60px" width="60px" circle="true" />
              ) : (
                <img
                  src={perfilIcon}
                  className="img-perfil-icon"
                  width="60px"
                  height="60px"
                />
              )}
              <img
                onClick={() => showPerfilMenu()}
                src={perfilMenuIcon}
                className="img-perfil-menu-icon"
                alt=""
              />
            </div>
          ) : (
            <div className="navbar-right-side">
              <Link to="/Register">
                <Button type="default" color="white">
                  Cadastre-se
                </Button>
              </Link>
              <Link to="/Login">
                <span href="">Fazer Login</span>
              </Link>
            </div>
          )}
          <div className="navbar-right-side-responsive">
            {user != undefined ? (
              <img
                width="50px"
                onClick={showPerfilMenu}
                src={perfilIcon}
                alt=""
              />
            ) : (
              <img
                width="30px"
                onClick={showResponsiveMenu}
                src={perfilMenuIcon}
                alt=""
              />
            )}
          </div>
        </div>

        <div id="responsive-menu" className="responsive-menu">
          <Link to="/Register">
            <Button
              className="button-menu-responsive"
              type="default"
              color="white"
            >
              Cadastre-se
            </Button>
          </Link>
          <Link to="/Login">
            <Button
              className="button-menu-responsive"
              type="default"
              color="white"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
