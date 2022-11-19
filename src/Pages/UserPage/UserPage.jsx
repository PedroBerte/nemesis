import React, { useState, useEffect, useContext } from "react";
import Button from "../../components/Button/Button";

import Navbar from "../../components/Navbar/Navbar";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Footer from "../../components/Footer/Footer";

import { db } from "../../services/firebase-config";
import { auth } from "../../services/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";

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
import listWeight from "../../images/listWeight.png";

import smallLogo from "./../../images/Logo.png";

import Modal from "react-modal";

import moment from "moment";

import styles from "./UserPage.module.css";
import Skeleton from "react-loading-skeleton";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
  const [diet, setDiet] = useState([]);
  const [dietIndex, setDietIndex] = useState(0);

  const [accordionIsOpen, setAccordionIsOpen] = useState("noResponse");
  const [lastAccordionOpen, setLastAccordionOpen] = useState();

  const [dietModal, setDietModal] = useState(false);
  const [dietOption, setDietOption] = useState(0);

  const { user, setUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsLoading(false);
      }
      setIsLoading(currentUser);
    });
    async function getUserDocs() {
      if (user != undefined) {
        const userDocs = await getDoc(doc(db, "users", user.uid));
        setDate(userDocs.data().date);
        setWeight(userDocs.data().weight);
        setHeight(userDocs.data().height);
      }
    }
    async function getWorkout() {
      if (user != undefined) {
        const workoutDocs = await getDoc(doc(db, "workouts", user.uid));
        setWorkout(workoutDocs.data().workouts);
      }
    }
    async function getDiet() {
      if (user != undefined) {
        const workoutDocs = await getDoc(doc(db, "diets", user.uid));
        setDiet(workoutDocs.data().diet);
      }
    }
    getDiet();
    getUserDocs();
    getWorkout();
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

  function closeDietModal() {
    setDietModal(false);
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

  function handleDietButtonIsPressed(index) {
    setDietModal(true);
    setDietIndex(index);
  }

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.38)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "15px",
      border: "none",
      width: "35%",
    },
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Navbar />
      <Modal
        isOpen={dietModal}
        onRequestClose={closeDietModal}
        style={customStyles}
        closeTimeoutMS={200}
      >
        <div className={styles.modalHeader}>
          <div>
            <h3 className={styles.modalTitle}>
              Refeição: {diet[dietIndex]?.meal}
            </h3>
            <h3 className={styles.modalSubtitle}>
              Horário: {diet[dietIndex]?.time}
            </h3>
          </div>
          <img
            className={styles.modalSmallLogo}
            width="35px"
            src={smallLogo}
            alt=""
          />
        </div>
        <div className={styles.modalContent}>
          <Carousel responsive={responsive} draggable={false}>
            <ul className={styles.dietList}>
              {diet[dietIndex]?.option[0].foods.map((food) => {
                return (
                  <li className={styles.dietListItem}>
                    <div>
                      <p className={styles.dietTexts}>
                        {food.name} - {food.quantity}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <ul className={styles.dietList}>
              {diet[dietIndex]?.option[1].foods.map((food) => {
                return (
                  <li className={styles.dietListItem}>
                    <div>
                      <p className={styles.dietTexts}>
                        {food.name} - {food.quantity}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Carousel>
          <div className={styles.optionChooseBody}>
            <p>Opção {dietOption}</p>
          </div>
        </div>
      </Modal>
      <h2 className={styles.title}>Perfil do usuário:</h2>
      <section className={styles.infoAndWorkout}>
        <div className={styles.userInformationBody}>
          <h3 className={styles.subtitle}>Suas medidas:</h3>
          <div className={styles.userIlustration}>
            <img height="270px" src={Men} alt="" />
            <div className={styles.userProgressBars}>
              <div className={styles.progressItem}>
                <div className={styles.textInformations}>
                  {age == "" ? (
                    <Skeleton
                      width="100px"
                      height="1rem"
                      style={{ marginBottom: 5 }}
                    />
                  ) : (
                    <>
                      <p className={styles.informationTitle}>Idade: </p>
                      <p className={styles.informationText}>{age} Anos</p>
                    </>
                  )}
                </div>
                <ProgressBar value={ageProgress} color="red" width="100%" />
              </div>
              <div className={styles.progressItem}>
                <div className={styles.textInformations}>
                  {height == "" ? (
                    <Skeleton
                      width="100px"
                      height="1rem"
                      style={{ marginBottom: 5 }}
                    />
                  ) : (
                    <>
                      <p className={styles.informationTitle}>Altura: </p>
                      <p
                        className={styles.informationText}
                        onClick={() => {
                          handleSetHeightProgressBar();
                        }}
                      >
                        {String(height / 100).replace(".", ",")}m
                      </p>
                    </>
                  )}
                </div>
                <ProgressBar
                  value={heightProgress}
                  color="#05FF00"
                  width="100%"
                />
              </div>
              <div className={styles.progressItem}>
                <div className={styles.textInformations}>
                  {weight == "" ? (
                    <Skeleton
                      width="100px"
                      height="1rem"
                      style={{ marginBottom: 5 }}
                    />
                  ) : (
                    <>
                      <p className={styles.informationTitle}>Peso: </p>
                      <p className={styles.informationText}>{weight}Kg</p>
                    </>
                  )}
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
            {workout == "" ? (
              <>
                <Skeleton
                  width="400px"
                  style={{ marginBottom: 10 }}
                  height="35px"
                />
                <Skeleton
                  width="400px"
                  style={{ marginBottom: 10 }}
                  height="35px"
                />
                <Skeleton
                  width="400px"
                  style={{ marginBottom: 10 }}
                  height="35px"
                />
                <Skeleton width="400px" height="35px" />
              </>
            ) : (
              <>
                {workout
                  .filter((item, i) => item.workoutInfos.name != undefined)
                  .map((workoutDay, i) => {
                    return (
                      <>
                        <li onClick={() => handleToggleAccordion(i)}>
                          <div className={styles.rowDiv}>
                            <div className={styles.texts}>
                              <p className={styles.weekName}>
                                {workoutDay.day}:
                              </p>
                              <p className={styles.workoutName}>
                                {workoutDay.workoutInfos.muscles}
                              </p>
                            </div>
                            <img src={listArrow} alt="" />
                          </div>
                          <div className={styles.hiddenWorkoutInfos}>
                            {workoutDay.workoutInfos.workoutsList.map(
                              (exercise) => {
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
                                    {workoutDay.workoutInfos.workoutsList.lastIndexOf(
                                      exercise
                                    ) ==
                                    workoutDay.workoutInfos.workoutsList
                                      .length -
                                      1 ? (
                                      ""
                                    ) : (
                                      <hr
                                        style={{
                                          borderTop: "1px dotted #BEBEBE",
                                          width: "85%",
                                          margin: "0 auto 0 auto",
                                        }}
                                      />
                                    )}
                                  </>
                                );
                              }
                            )}
                          </div>
                        </li>
                        {workout.lastIndexOf(workoutDay) ==
                        workout.filter(
                          (item, i) => item.workoutInfos.name != undefined
                        ).length -
                          1 ? (
                          ""
                        ) : (
                          <hr
                            style={{
                              borderTop: "1px dotted #BEBEBE",
                              width: "110%",
                            }}
                          />
                        )}
                      </>
                    );
                  })}
              </>
            )}
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
          <div
            className={styles.foodItem}
            onClick={() => handleDietButtonIsPressed(0)}
          >
            <img src={coffeeIcon} alt="" />
            <p id="coffee" className={styles.cardName}>
              Café da manhã
            </p>
          </div>
          <div
            className={styles.foodItem}
            onClick={() => handleDietButtonIsPressed(1)}
          >
            <img src={appleIcon} alt="" />
            <p id="apple" className={styles.cardName}>
              Lanche
            </p>
          </div>
          <div
            className={styles.foodItem}
            onClick={() => handleDietButtonIsPressed(2)}
          >
            <img src={dinnerIcon} alt="" />
            <p id="lunch" className={styles.cardName}>
              Almoço
            </p>
          </div>
          <div
            className={styles.foodItem}
            onClick={() => handleDietButtonIsPressed(3)}
          >
            <img src={breakfastIcon} alt="" />
            <p id="bread" className={styles.cardName}>
              Café da tarde
            </p>
          </div>
          <div
            className={styles.foodItem}
            onClick={() => handleDietButtonIsPressed(4)}
          >
            <img src={dinnerIcon} alt="" />
            <p id="dinner" className={styles.cardName}>
              Jantar
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
