import React from "react";
import Button from "../../components/Button/Button";
import LineSpace from "../../components/LineSpace/LineSpace";

import Navbar from "../../components/Navbar/Navbar";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Footer from "../../components/Footer/Footer";

import Men from "./../../images/men.png";
import listArrow from "../../images/listArrow.png";
import leftArrow from "../../images/leftArrow.png";
import rightArrow from "../../images/rightArrow.png";

import coffeeIcon from "../../images/coffeIcon.png";
import appleIcon from "../../images/appleIcon.png";
import dinnerIcon from "../../images/dinner.png";
import breakfastIcon from "../../images/breakfastIcon.png";
import supperIcon from "../../images/supperIcon.png";

import styles from "./UserPage.module.css";

export default function UserPage() {
  function handleCardController(side) {
    if (side == "left") {
      document.getElementById("foodContainer").scrollLeft -= 210;
    } else {
      document.getElementById("foodContainer").scrollLeft += 210;
    }
  }

  return (
    <>
      <Navbar />
      <h2 className={styles.title}>Perfil do usuário:</h2>
      <section className={styles.infoAndWorkout}>
        <div className={styles.userInformationBody}>
          <h3 className={styles.subtitle}>Suas medidas:</h3>
          <div className={styles.userIlustration}>
            <img height="270px" src={Men} alt="" />
            <div className={styles.userProgressBars}>
              <div className={styles.progressItem}>
                <div className={styles.textInformations}>
                  <p className={styles.informationTitle}>Idade: </p>
                  <p className={styles.informationText}></p>
                </div>
                <ProgressBar value="60" color="red" width="100%" />
              </div>
              <div className={styles.progressItem}>
                <div className={styles.textInformations}>
                  <p className={styles.informationTitle}>Altura: </p>
                  <p className={styles.informationText}></p>
                </div>
                <ProgressBar value="70" color="#05FF00" width="100%" />
              </div>
              <div className={styles.progressItem}>
                <div className={styles.textInformations}>
                  <p className={styles.informationTitle}>Peso: </p>
                  <p className={styles.informationText}></p>
                </div>
                <ProgressBar value="40" color="yellow" width="100%" />
              </div>
              <div className={styles.rightDiv}>
                <Button id={styles.updateInfosButton} type="default">
                  Atualizar Medidas
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
        <hr className={styles.spacer} />
        <div className={styles.workouts}>
          <div className={styles.inlineTitle}>
            <h3 className={styles.rightSubtitle}>Rotina de treinos:</h3>
            <Button type="default" id={styles.changeButton}>
              Alterar
            </Button>
          </div>
          <ul className={styles.workoutList}>
            <li>
              <div className={styles.texts}>
                <p className={styles.weekName}>Segunda-Feira:</p>
                <p className={styles.workoutName}>Peito e triceps</p>
              </div>
              <img src={listArrow} alt="" />
            </li>
            <hr style={{ borderTop: "1px dotted #BEBEBE", width: "110%" }} />
            <li>
              <div className={styles.texts}>
                <p className={styles.weekName}>Terça-Feira:</p>
                <p className={styles.workoutName}>Costa e biceps</p>
              </div>
              <img src={listArrow} alt="" />
            </li>
            <hr style={{ borderTop: "1px dotted #BEBEBE", width: "110%" }} />
            <li>
              <div className={styles.texts}>
                <p className={styles.weekName}>Quarta-Feira:</p>
                <p className={styles.workoutName}>Ombro e panturrilha</p>
              </div>
              <img src={listArrow} alt="" />
            </li>
            <hr style={{ borderTop: "1px dotted #BEBEBE", width: "110%" }} />
            <li>
              <div className={styles.texts}>
                <p className={styles.weekName}>Sexta-Feira:</p>
                <p className={styles.workoutName}>Abdomêm (completo)</p>
              </div>
              <img src={listArrow} alt="" />
            </li>
            <hr style={{ borderTop: "1px dotted #BEBEBE", width: "110%" }} />
            <li>
              <div className={styles.texts}>
                <p className={styles.weekName}>Sábado:</p>
                <p className={styles.workoutName}>Perna (completo)</p>
              </div>
              <img src={listArrow} alt="" />
            </li>
          </ul>
        </div>
      </section>
      <h2 className={styles.title}>Alimentação</h2>
      <section className={styles.food}>
        <div className={styles.itemControl}>
          <img
            onClick={() => handleCardController("left")}
            id="leftArrow"
            src={leftArrow}
            alt=""
          />
          <img
            onClick={() => handleCardController("right")}
            id="rightArrow"
            src={rightArrow}
            alt=""
          />
        </div>
        <div id="foodContainer" className={styles.foodContainer}>
          <div className={styles.foodItem}>
            <img src={coffeeIcon} alt="" />
            <p id="coffee" className={styles.cardName}>
              Café da manhã
            </p>
          </div>
          <div className={styles.foodItem}>
            <img src={appleIcon} alt="" />
            <p id="apple" className={styles.cardName}>
              Lanche
            </p>
          </div>
          <div className={styles.foodItem}>
            <img src={dinnerIcon} alt="" />
            <p id="lunch" className={styles.cardName}>
              Almoço
            </p>
          </div>
          <div className={styles.foodItem}>
            <img src={breakfastIcon} alt="" />
            <p id="bread" className={styles.cardName}>
              Café da tarde
            </p>
          </div>
          <div className={styles.foodItem}>
            <img src={dinnerIcon} alt="" />
            <p id="dinner" className={styles.cardName}>
              Jantar
            </p>
          </div>
          <div className={styles.foodItem}>
            <img height="80px" src={supperIcon} alt="" />
            <p id="supper" className={styles.cardName}>
              Ceia
            </p>
          </div>
        </div>
      </section>
      <div className={styles.inlineFooterTexts}>
        <h3>Lembrete!</h3>
        <h3>
          O plano de dieta é apenas uma sugestão. Para algo mais personalizado
          contate um profissional.
        </h3>
      </div>
      <Footer />
    </>
  );
}
