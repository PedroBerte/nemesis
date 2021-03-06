import React, { useState, useEffect, useContext } from "react";
import Button from "../../components/Button/Button";

import Navbar from "../../components/Navbar/Navbar";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Footer from "../../components/Footer/Footer";

import { db } from "../../services/firebase-config";
import { auth } from "../../services/firebase-config";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

import { AuthContext } from "./../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import Men from "./../../images/men.png";
import listArrow from "../../images/listArrow.png";
import leftArrow from "../../images/leftArrow.png";
import rightArrow from "../../images/rightArrow.png";
import coffeeIcon from "../../images/coffeIcon.png";
import appleIcon from "../../images/appleIcon.png";
import dinnerIcon from "../../images/dinner.png";
import breakfastIcon from "../../images/breakfastIcon.png";
import supperIcon from "../../images/supperIcon.png";
import workoutIcon from "../../images/workoutIcon.png";
import listWeight from "../../images/listWeight.png";

import moment from "moment";

import styles from "./UserPage.module.css";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

export default function UserPage() {
  moment().format();
  const navigateTo = useNavigate();

  const [date, setDate] = useState("");
  const [age, setAge] = useState("");
  const [ageProgress, setAgeProgress] = useState("");
  const [height, setHeight] = useState("");
  const [heightProgress, setHeightProgress] = useState("");
  const [weight, setWeight] = useState("");
  const [weightProgress, setWeightProgress] = useState("");
  const [workout, setWorkout] = useState([]);

  const [accordionIsOpen, setAccordionIsOpen] = useState(false);
  const [lastAccordionOpen, setLastAccordionOpen] = useState();

  const { user, setUser } = useContext(AuthContext);
  const userCollectionRef = collection(db, "users");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    if (user == undefined) {
      navigateTo("/");
    }
    async function getUserDocs() {
      if (user != undefined) {
        const userDocs = await getDoc(doc(db, "users", user.uid));
        setDate(userDocs.data().date);
        setWeight(userDocs.data().weight);
        setHeight(userDocs.data().height);
        setWorkout(userDocs.data().workouts);
      }
    }
    getUserDocs();
  }, [user]);

  useEffect(() => {
    if (date != "") {
      setAge(moment().diff(date, "years"));
    }
  }, [date]);

  useEffect(() => {
    handleSetHeightProgressBar();
  }, [height]);

  useEffect(() => {
    handleSetAgeProgressBar();
  }, [age]);

  useEffect(() => {
    handleSetWeightProgressBar();
  }),
    [weight];

  function handleCardController(side) {
    if (side == "left") {
      document.getElementById("foodContainer").scrollLeft -= 500;
    } else {
      document.getElementById("foodContainer").scrollLeft += 500;
    }
  }

  function handleSetHeightProgressBar() {
    var heightFormated = height - 145;

    var a = 75;
    var b = 100 * heightFormated;
    var result = b / a;
    setHeightProgress(result);
  }

  function handleSetAgeProgressBar() {
    var ageFormated = age - 12;

    var a = 68;
    var b = 100 * ageFormated;
    var result = b / a;
    setAgeProgress(result);
  }

  function handleSetWeightProgressBar() {
    var weightFormated = weight - 40;

    var a = 160;
    var b = 100 * weightFormated;
    var result = b / a;
    setWeightProgress(result);
  }

  function handleToggleAccordion(e) {
    var accordionItens = document.getElementsByClassName(
      styles.hiddenWorkoutInfos
    );
    setLastAccordionOpen(e);
    if (lastAccordionOpen == e) {
      document.getElementsByClassName(styles.hiddenWorkoutInfos)[
        lastAccordionOpen
      ].style.height = "0px";
      setAccordionIsOpen(false);
      setLastAccordionOpen();
      return;
    }
    if (accordionIsOpen == false) {
      setAccordionIsOpen(true);
      setLastAccordionOpen(e);
      document.getElementsByClassName(styles.hiddenWorkoutInfos)[
        e
      ].style.height = "140px";
    } else {
      for (var i = 0; i < accordionItens.length; i++) {
        document.getElementsByClassName(styles.hiddenWorkoutInfos)[
          i
        ].style.height = "0px";
      }
      document.getElementsByClassName(styles.hiddenWorkoutInfos)[
        e
      ].style.height = "140px";
      setLastAccordionOpen(e);
      setAccordionIsOpen(true);
    }
  }

  return (
    <>
      <Navbar />
      <h2 className={styles.title}>Perfil do usu??rio:</h2>
      <section className={styles.infoAndWorkout}>
        <div className={styles.userInformationBody}>
          <h3 className={styles.subtitle}>Suas medidas:</h3>
          <div className={styles.userIlustration}>
            <img height="270px" src={Men} alt="" />
            <div className={styles.userProgressBars}>
              <div className={styles.progressItem}>
                <div className={styles.textInformations}>
                  <p className={styles.informationTitle}>Idade: </p>
                  <p className={styles.informationText}>{age} Anos</p>
                </div>
                <ProgressBar value={ageProgress} color="red" width="100%" />
              </div>
              <div className={styles.progressItem}>
                <div className={styles.textInformations}>
                  <p className={styles.informationTitle}>Altura: </p>
                  <p
                    className={styles.informationText}
                    onClick={() => {
                      handleSetHeightProgressBar();
                    }}
                  >
                    {String(height / 100).replace(".", ",")}m
                  </p>
                </div>
                <ProgressBar
                  value={heightProgress}
                  color="#05FF00"
                  width="100%"
                />
              </div>
              <div className={styles.progressItem}>
                <div className={styles.textInformations}>
                  <p className={styles.informationTitle}>Peso: </p>
                  <p className={styles.informationText}>{weight}Kg</p>
                </div>
                <ProgressBar
                  value={weightProgress}
                  color="yellow"
                  width="100%"
                />
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
            {workout.map((workouts, i) => {
              return (
                <>
                  <li onClick={() => handleToggleAccordion(i)}>
                    <div className={styles.rowDiv}>
                      <div className={styles.texts}>
                        <p className={styles.weekName}>{workouts.day}:</p>
                        <p className={styles.workoutName}>{workouts.muscles}</p>
                      </div>
                      <img src={listArrow} alt="" />
                    </div>
                    <div className={styles.hiddenWorkoutInfos}>
                      {workouts.workoutsInfos.map((exercise) => {
                        return (
                          <>
                            <div className={styles.itemBody}>
                              <div className={styles.workoutNameBody}>
                                <img src={listWeight} alt="" />
                                <p className={styles.workoutName}>
                                  {exercise.name}
                                </p>
                              </div>
                              <p className={styles.workoutName}>
                                {exercise.rep}
                              </p>
                            </div>
                            {workouts.workoutsInfos.lastIndexOf(exercise) ==
                            workouts.workoutsInfos.length - 1 ? (
                              ""
                            ) : (
                              <hr
                                style={{
                                  borderTop: "1px dotted #BEBEBE",
                                  width: "100%",
                                }}
                              />
                            )}
                          </>
                        );
                      })}
                    </div>
                  </li>
                  {workout.lastIndexOf(workouts) == workout.length - 1 ? (
                    ""
                  ) : (
                    <hr
                      style={{ borderTop: "1px dotted #BEBEBE", width: "110%" }}
                    />
                  )}
                </>
              );
            })}
          </ul>
        </div>
      </section>
      <h2 className={styles.title}>Alimenta????o</h2>
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
              Caf?? da manh??
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
              Almo??o
            </p>
          </div>
          <div className={styles.foodItem}>
            <img src={breakfastIcon} alt="" />
            <p id="bread" className={styles.cardName}>
              Caf?? da tarde
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
          O plano de dieta ?? apenas uma sugest??o. Para algo mais personalizado
          contate um profissional.
        </h3>
      </div>
      <Footer />
    </>
  );
}
