import React, { useContext, useEffect } from "react";
import styles from "./StartPage.module.css";

import Button from "../../components/Button/Button";
import Navbar from "./../../components/Navbar/Navbar";
import AbacatePeso from "./../../images/AbacatePeso1.png";
import Waves from "./../../images/waves.png";
import Men from "./../../images/men.png";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import AbacateCorrida from "./../../images/AbacateCorrida1.png";
import SmartphoneNotification from "./../../images/phoneNotification.png";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase-config";

import { AuthContext } from "./../../contexts/AuthContext";

import { Link } from "react-router-dom";

import Footer from "../../components/Footer/Footer";
import Input from "../../components/Input/Input";

const StartPage = () => {
  const { user, setUser, userInformation, setUserInformation } =
    useContext(AuthContext);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      <Navbar />
      <section className={styles.apresentation}>
        <div className={styles.leftSide}>
          <div>
            <p className={styles.titleNowrap}>
              Com o Nêmesis, seu maior inimigo <br /> deixará de ser você mesmo.
            </p>
            <p className={styles.titleWrap}>
              Com o Nêmesis, seu maior inimigo deixará de ser você mesmo.
            </p>
            <p className={styles.subtitle}>
              Chega de desculpas. Rápido, fácil e <br /> totalmente gratuito.
            </p>
          </div>
          <form className={styles.form}>
            <Input
              className={styles.inputApresentation}
              style={{ width: "70%" }}
              placeholder="Insira o seu melhor E-mail!"
            />
            <Button
              style={{ marginLeft: "60px" }}
              type="default"
              width="200px"
              height="50px"
              shadow="2px 5px 4px rgba(0, 0, 0, 0.20)"
            >
              Cadastre-se
            </Button>
          </form>
        </div>
        <div className={styles.rightSide}>
          <img className={styles.abacatePeso} src={AbacatePeso} alt="" />
        </div>
      </section>
      <img src={Waves} width="100%" alt="" />
      <section className={styles.results}>
        <div className={styles.resultsLeftSide}>
          <p className={styles.titleNowrap}>
            Com suas medidas, montamos o melhor <br /> programa para alcançar
            seus objetivos.
          </p>
          <p className={styles.titleWrap} style={{ marginTop: "58px" }}>
            Com suas medidas, montamos o melhor programa para alcançar seus
            objetivos.
          </p>
          <p className={styles.subtitle}>
            Dieta personalizada de acordo com suas preferencias.
          </p>
          <div className={styles.statisticsMen}>
            <img className={styles.menImg} src={Men} />
            <div className={styles.statistics}>
              <p className={styles.text}>Idade: 28 anos</p>
              <ProgressBar width="90%" color="red" value="30" />
              <br />
              <p className={styles.text}>Altura: 1,73m</p>
              <ProgressBar width="90%" color="#05FF00" value="46" />
              <br />
              <p className={styles.text}>Peso: 82,5kg</p>
              <ProgressBar width="90%" color="yellow" value="52" />
            </div>
          </div>
        </div>
        <div className={styles.resultsRightSide}>
          <p style={{ marginBottom: "40px" }} className="subtitle">
            Cronograma de treinos alinhado com seus objetivos.
          </p>
          <img className={styles.AbacateCorrida} src={AbacateCorrida} alt="" />
        </div>
      </section>
      <img className={styles.waveInverted} src={Waves} width="100%" alt="" />
      <section className={styles.notificationArea}>
        <div className={styles.textsRight}>
          <p
            style={{ marginBottom: "40px" }}
            className={styles.titleRightNowrap}
          >
            Fique tranquilo, nós sempre te lembramos de
            <br />
            correr atrás dos seus objetivos.
          </p>
          <p style={{ marginBottom: "40px" }} className={styles.titleRightWrap}>
            Fique tranquilo, nós sempre te lembramos de correr atrás dos seus
            objetivos.
          </p>
          <p className={styles.subtitle}>
            Dieta personalizada de acordo com suas preferencias.
          </p>
        </div>
        <div className={styles.imageCenter}>
          <img
            className={styles.smartphone}
            width="80%"
            src={SmartphoneNotification}
            alt=""
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default StartPage;
