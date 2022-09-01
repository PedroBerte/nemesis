import React from "react";
import styles from "./MenuLateral.module.css";

import perfilIcon from "../../../images/perfil-icon.png";
import perfilMenuIcon from "../../../images/perfilMenuIcon.png";
import closeIcon from "../../../images/closeIcon.png";
import gymIcon from "../../../images/gymIcon.svg";
import configIcon from "../../../images/configIcon.svg";

import LineSpace from "../../LineSpace/LineSpace";
import Button from "../../Button/Button";

import { Link } from "react-router-dom";

export default function MenuLateral(props) {
  const logOut = async () => {
    setUser();
    setUserInformation();
    await signOut(auth);
    location.reload();
  };
  return (
    <>
      <div onClick={() => showPerfilMenu()} className={styles.shadowBox}>
        <div
          id={styles.lateralMenuBody}
          className={
            props.active
              ? styles.lateralMenuBodyActive
              : styles.lateralMenuBodyInactive
          }
        >
          <div className={styles.lateralMenuUser}>
            <img src={perfilIcon} width="60px" />
            <div className={styles.lateralMenuLoggedTexts}>
              <p className={styles.navbarUsername}>{props.name}</p>
              {props.goal == "G" ? (
                <p className={styles.navbarGoal}>Ficando Fortão! 💪</p>
              ) : (
                <p className={styles.navbarGoal}>Perdendo Peso! 🏃</p>
              )}
            </div>
            <img
              onClick={() => props.setIsActive(false)}
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
      </div>
    </>
  );
}
