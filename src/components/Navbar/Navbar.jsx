import styles from "./Navbar.module.css";
import React, { useContext, useEffect, useState } from "react";
import perfilIcon from "./../../images/perfil-icon.png";
import perfilMenuIcon from "./../../images/perfilMenuIcon.png";
import closeIcon from "./../../images/closeIcon.png";
import gymIcon from "./../../images/gymIcon.svg";
import configIcon from "./../../images/configIcon.svg";

import { db } from "../../services/firebase-config";
import { auth } from "../../services/firebase-config";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";

import { signOut } from "firebase/auth/";
import { collection, getDocs } from "firebase/firestore";

import { AuthContext } from "./../../contexts/AuthContext";

import LineSpace from "../LineSpace/LineSpace";
import Button from "./../Button/Button";

import { Link } from "react-router-dom";
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

  const logOut = async () => {
    setUser();
    setUserInformation();
    await signOut(auth);
    location.reload();
  };

  const showResponsiveMenu = () => {
    if (!isShowed) {
      document.getElementById(styles.responsiveMenu).style.visibility =
        "visible";
      document.getElementById(styles.responsiveMenu).style.opacity = "100%";
      document.getElementById(styles.responsiveMenu).style.height = "100px";
      document.getElementById(styles.navbarBody).style.boxShadow =
        "0px 3px 3px rgba(0, 0, 0, 0.25)";
      isShowed = true;
    } else {
      document.getElementById(styles.responsiveMenu).style.visibility =
        "hidden";
      document.getElementById(styles.responsiveMenu).style.opacity = "0%";
      document.getElementById(styles.responsiveMenu).style.height = "0px";
      document.getElementById(styles.navbarBody).style.boxShadow = "none";
      isShowed = false;
    }
  };

  const showPerfilMenu = () => {
    if (!isPerfilMenuShowed) {
      document.getElementById(styles.lateralMenuBody).style.width = "350px";
      document.getElementById(styles.shadowBox).style.width = "100%";
      document.getElementById(styles.shadowBox).style.opacity = "100%";
      isPerfilMenuShowed = true;
    } else {
      document.getElementById(styles.lateralMenuBody).style.width = "0px";
      document.getElementById(styles.shadowBox).style.opacity = "0%";
      setTimeout(() => {
        document.getElementById(styles.shadowBox).style.width = "0%";
      }, 500);

      isPerfilMenuShowed = false;
    }
  };

  return (
    <>
      <div
        onClick={() => showPerfilMenu()}
        id={styles.shadowBox}
        className={styles.shadowBox}
      ></div>
      <div id={styles.lateralMenuBody} className={styles.lateralMenuBody}>
        <div className={styles.lateralMenuUser}>
          <img src={perfilIcon} width="60px" />
          <div className={styles.lateralMenuLoggedTexts}>
            <p className={styles.navbarUsername}>{name}</p>
            {goal == "G" ? (
              <p className={styles.navbarGoal}>Ficando Fortão! 💪</p>
            ) : (
              <p className={styles.navbarGoal}>Perdendo Peso! 🏃</p>
            )}
          </div>
          <img
            onClick={() => showPerfilMenu()}
            src={closeIcon}
            className={styles.imgPerfilMenuIcon}
            alt=""
          />
        </div>
        <LineSpace width="280px" margin="1.5rem" />
        <ul className={styles.lateralMenuList}>
          <li className={styles.lateralMenuListItem}>
            <img width="27px" src={gymIcon} alt="" />
            <Link to="/UserPage">
              <p>Treino e Estatísticas</p>
            </Link>
          </li>
          <li className={styles.lateralMenuListItem}>
            <img width="27px" src={configIcon} alt="" />
            <Link to="/UserSettings">
              <p>Configurações da Conta</p>
            </Link>
          </li>
        </ul>
        <Button
          id={styles.buttonLateralMenuLogout}
          type="warning"
          color="white"
          onClick={() => logOut()}
        >
          Deslogar
        </Button>
      </div>

      <div className={styles.navbarBody} id={styles.navbarBody}>
        <div className={styles.navbarFlex}>
          <div className={styles.navbarLeftSide}>
            <Link to="/">
              <div className={styles.navbarLogo}></div>
            </Link>
          </div>
          {user != undefined ? (
            <div className={styles.navbarRightSideLogged}>
              <div className={styles.navbarLoggedTexts}>
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
                    <p className={styles.navbarUsername}>{name}</p>
                    {goal == "G" ? (
                      <p className={styles.navbarGoal}>Ficando Fortão! 💪</p>
                    ) : (
                      <p className={styles.navbarGoal}>Perdendo Peso! 🏃</p>
                    )}
                  </>
                )}
              </div>
              {name == "" ? (
                <Skeleton height="60px" width="60px" circle="true" />
              ) : (
                <img
                  src={perfilIcon}
                  className={styles.imgPerfilIcon}
                  width="60px"
                  height="60px"
                />
              )}
              <img
                onClick={() => showPerfilMenu()}
                src={perfilMenuIcon}
                className={styles.imgPerfilMenuIcon}
                alt=""
              />
            </div>
          ) : (
            <div className={styles.navbarRightSide}>
              <Link to="/SignUp">
                <Button type="default" color="white">
                  Cadastre-se
                </Button>
              </Link>
              <Link to="/SignIn">
                <span href="">Fazer Login</span>
              </Link>
            </div>
          )}
          <div className={styles.navbarRightSideResponsive}>
            {user != undefined ? (
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginRight: "10px",
                  }}
                >
                  {name == "" ? (
                    <>
                      <Skeleton
                        style={{ marginBottom: "7px" }}
                        width="130px"
                        height="1rem"
                      />
                      <Skeleton
                        style={{ marginBottom: "7px" }}
                        width="130px"
                        height="0.8rem"
                      />
                    </>
                  ) : (
                    <>
                      <p className={styles.navbarUsername}>{name}</p>
                      {goal == "G" ? (
                        <p className={styles.navbarGoal}>Ficando Fortão! 💪</p>
                      ) : (
                        <p className={styles.navbarGoal}>Perdendo Peso! 🏃</p>
                      )}
                    </>
                  )}
                </div>
                <img
                  width="50px"
                  onClick={showPerfilMenu}
                  src={perfilIcon}
                  alt=""
                />
              </div>
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

        <div id={styles.responsiveMenu} className={styles.responsiveMenu}>
          <Link to="/SignUp">
            <Button
              className={styles.buttonMenuResponsive}
              type="default"
              color="white"
            >
              Cadastre-se
            </Button>
          </Link>
          <Link to="/SignIn">
            <Button
              className={styles.buttonMenuResponsive}
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
