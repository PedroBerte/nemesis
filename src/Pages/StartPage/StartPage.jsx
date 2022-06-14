import React, { useContext, useEffect } from "react";

import Button from "../../components/Button/Button";
import Navbar from "./../../components/Navbar/Navbar";
import "./StartPage.css";
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
      <section className="apresentation">
        <div className="text-left-side">
          <div>
            <p className="title nowrap">
              Com o Nêmesis, seu maior inimigo <br /> deixará de ser você mesmo.
            </p>
            <p className="title wrap">
              Com o Nêmesis, seu maior inimigo deixará de ser você mesmo.
            </p>
            <p className="subtitle">
              Chega de desculpas. Rápido, fácil e <br /> totalmente gratuito.
            </p>
          </div>
          <form className="form-start-page">
            <input
              type="email"
              className="input-apresentation"
              placeholder="Insira seu E-mail"
            />
            <Button
              text="Cadastre-se"
              background="#45c4b0"
              color="white"
              width="200px"
              height="50px"
              shadow="2px 6px 4px rgba(0, 0, 0, 0.25)"
            >
              Cadastre-se
            </Button>
          </form>
        </div>
        <div className="image-right-side">
          <img className="abacate-peso" src={AbacatePeso} alt="" />
        </div>
      </section>
      <img src={Waves} width="100%" alt="" />
      <section className="results">
        <div className="results-left-side">
          <p className="title nowrap">
            Com suas medidas, montamos o melhor <br /> programa para alcançar
            seus objetivos.
          </p>
          <p className="title wrap" style={{ marginTop: "58px" }}>
            Com suas medidas, montamos o melhor programa para alcançar seus
            objetivos.
          </p>
          <p className="subtitle">
            Dieta personalizada de acordo com suas preferencias.
          </p>
          <div className="statistics-men">
            <img className="men-img" src={Men} />
            <div className="statistics">
              <p className="text">Idade: 28 anos</p>
              <ProgressBar width="90%" color="red" value="30" />
              <br />
              <p className="text">Altura: 1,73m</p>
              <ProgressBar width="90%" color="#05FF00" value="46" />
              <br />
              <p className="text">Peso: 82,5kg</p>
              <ProgressBar width="90%" color="yellow" value="52" />
            </div>
          </div>
        </div>
        <div className="results-right-side">
          <p style={{ marginBottom: "40px" }} className="subtitle">
            Cronograma de treinos alinhado com seus objetivos.
          </p>
          <img className="abacate-corrida" src={AbacateCorrida} alt="" />
        </div>
      </section>
      <img className="wave-inverted" src={Waves} width="100%" alt="" />
      <section className="notification-area">
        <div className="texts-right">
          <p style={{ marginBottom: "40px" }} className="title-right nowrap">
            Fique tranquilo, nós sempre te lembramos de
            <br />
            correr atrás dos seus objetivos.
          </p>
          <p style={{ marginBottom: "40px" }} className="title-right wrap">
            Fique tranquilo, nós sempre te lembramos de correr atrás dos seus
            objetivos.
          </p>
          <p className="subtitle">
            Dieta personalizada de acordo com suas preferencias.
          </p>
        </div>
        <div className="image-center">
          <img
            className="smartphone"
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
