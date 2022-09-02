import styles from "./SignUp.module.css";
import React, { useState, useEffect } from "react";

import AbacateAlongamento from "./../../images/AbacateAlongamento1.png";
import Logo from "./../../images/NemesisV1.1.png";
import LeftWave from "./../../images/wave-left.png";

import { Link, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../services/firebase-config";
import { setDoc, doc, updateDoc, getDoc, collection } from "firebase/firestore";

import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import createWorkout from "./utils/createWorkout";
import EmailStep from "./Steps/EmailStep/EmailStep";
import UserInfoStep from "./Steps/UserInfoStep/UserInfoStep";
import { useSignUp } from "../../contexts/SignUpContext";
import createDiet from "./utils/createDiet";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const SignUp = () => {
  const provider = new GoogleAuthProvider();
  moment().format();
  const navigateTo = useNavigate();

  const {
    registerName,
    registerEmail,
    registerConfirmEmail,
    registerPassword,
    registerConfirmPassword,
    registerBornDate,
    registerSex,
    registerHeight,
    registerWeight,
    registerGoal,
    gymAvailability,
    gymFreq,
    gymDays,
    userRes,
    userUID,
    setUserUID,
    step,
    setStep,
    setUser,
    user,
    setIsLoggedWithGoogle,
    isLoggedWithGoogle,
  } = useSignUp();

  const [age, setAge] = useState("");

  function stringContainsNumber(_string) {
    return /\d/.test(_string);
  }

  function handleHeightNumber(height) {
    if (height.indexOf(".") > -1) {
      return height.replace(".", "");
    } else {
      return height;
    }
  }

  function getCurrentDate(age) {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    function formatMonth(month) {
      if (String(month).length > 1) {
        return month;
      } else {
        return `0${month}`;
      }
    }

    function formatDay(day) {
      if (String(day).length > 1) {
        return day;
      } else {
        return `0${day}`;
      }
    }

    if (age > 0) {
      return `${year - age}-${formatMonth(month)}-${formatDay(day)}`;
    } else {
      return `${year}-${formatMonth(month)}-${formatDay(day)}`;
    }
  }

  function getException(message) {
    this.message = message;
  }

  function tryRegisterUser() {
    if (step == 0) {
      toast.promise(RegisterUser(), {
        loading: "Carregando...",
        success: "Apenas mais uma etapa... 🏋🏻‍♀️",
        error: (err) => err.message.toString(),
      });
    } else {
      toast.promise(RegisterUser(), {
        loading: "Carregando...",
        success: "Conta criada! Aproveite 🥳",
        error: (err) => err.message.toString(),
      });
    }
  }

  async function userExists(e) {
    try {
      const auser = await getDoc(doc(db, "users", e.uid));
      if (auser._document == null) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  function loginWithGoogle() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const newUser = result.user;
        setUser(newUser);
        setUserUID(user.uid);
        setIsLoggedWithGoogle(true);
        const isUserAlreadyExist = await userExists(newUser);
        if (!isUserAlreadyExist) {
          setStep(1);
        } else {
          toast.success("Você já está cadastrado!");
          setTimeout(() => {
            navigateTo("/");
          }, 1000);
        }
      })
      .catch((error) => {
        setStep(0);
        toast.error(error);
      });
  }

  async function RegisterUser() {
    if (step == 0) {
      try {
        if (
          (registerName,
          registerEmail,
          registerConfirmEmail,
          registerPassword,
          registerConfirmPassword == "")
        ) {
          throw new getException("Não deixe campos vazios!");
        }
        if (stringContainsNumber(registerName)) {
          throw new getException("Insira um nome valido!");
        }
        if (registerEmail != registerConfirmEmail) {
          throw new getException("Os E-mails não coincidem!");
        }
        if (registerPassword != registerConfirmPassword) {
          throw new getException("As senhas não coincidem!");
        }
        setTimeout(() => {
          setStep(1);
        }, 1000);
      } catch (error) {
        throw error;
      }
    } else {
      if (isLoggedWithGoogle) {
        try {
          if (
            (registerBornDate,
            registerSex,
            registerHeight,
            registerWeight,
            registerGoal == "")
          ) {
            throw new getException("Não deixe campos vazios!");
          }
          if (String(getCurrentDate()) == registerBornDate) {
            throw new getException("Insira uma data de nascimento valida!");
          }
          if (moment(registerBornDate).isAfter(getCurrentDate())) {
            throw new getException("Insira uma data de nascimento valida!");
          }
          if (moment(registerBornDate).isAfter(getCurrentDate(12))) {
            throw new getException(
              "Apenas pessoas com mais de 12 anos podem se cadastrar no Nemesis!"
            );
          }
          if (moment(registerBornDate).isBefore(getCurrentDate(80))) {
            throw new getException("A idade máxima é de 80 anos");
          }
          if (registerWeight < 40) {
            throw new getException("O peso mínimo é de 40Kg!");
          }
          if (registerWeight > 200) {
            throw new getException("O peso máximo é de 200Kg!");
          }
          if (handleHeightNumber(registerHeight) < 145) {
            throw new getException("A altura mínima é de 1,45M!");
          }
          if (handleHeightNumber(registerHeight) > 220) {
            throw new getException("A altura máxima é de 2,20M!");
          }
          if ((gymAvailability, gymDays == "")) {
            throw new getException("Não deixe campos vazios!");
          }
          console.log("passou aqui");
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            date: registerBornDate,
            sex: registerSex,
            height: handleHeightNumber(registerHeight),
            weight: registerWeight,
            goal: registerGoal,
            gymAvail: gymAvailability,
            gymFreq: gymFreq,
            gymDays: gymDays,
            userRes: userRes,
          });
          createWorkout(gymAvailability, gymDays, user.uid);
          createDiet(
            registerBornDate,
            registerWeight,
            registerHeight,
            registerSex,
            registerGoal,
            userRes,
            user.uid
          );
          setTimeout(() => {
            navigateTo("/");
          }, 1000);
        } catch (error) {
          if (error.code == "auth/email-already-in-use") {
            setStep(0);
            throw new getException("Este E-mail já esta em uso!");
          }
          throw error;
        }
      } else {
        try {
          if (
            (registerBornDate,
            registerSex,
            registerHeight,
            registerWeight,
            registerGoal == "")
          ) {
            throw new getException("Não deixe campos vazios!");
          }
          if (String(getCurrentDate()) == registerBornDate) {
            throw new getException("Insira uma data de nascimento valida!");
          }
          if (moment(registerBornDate).isAfter(getCurrentDate())) {
            throw new getException("Insira uma data de nascimento valida!");
          }
          if (moment(registerBornDate).isAfter(getCurrentDate(12))) {
            throw new getException(
              "Apenas pessoas com mais de 12 anos podem se cadastrar no Nemesis!"
            );
          }
          if (moment(registerBornDate).isBefore(getCurrentDate(80))) {
            throw new getException("A idade máxima é de 80 anos");
          }
          if (registerWeight < 40) {
            throw new getException("O peso mínimo é de 40Kg!");
          }
          if (registerWeight > 200) {
            throw new getException("O peso máximo é de 200Kg!");
          }
          if (handleHeightNumber(registerHeight) < 145) {
            throw new getException("A altura mínima é de 1,45M!");
          }
          if (handleHeightNumber(registerHeight) > 220) {
            throw new getException("A altura máxima é de 2,20M!");
          }
          if ((gymAvailability, gymDays == "")) {
            throw new getException("Não deixe campos vazios!");
          }
          const user = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
          );
          setUserUID(user.user.uid);
          const uid = user.user.uid;
          await setDoc(doc(db, "users", uid), {
            uid: uid,
            name: registerName,
            email: registerEmail,
            date: registerBornDate,
            sex: registerSex,
            height: handleHeightNumber(registerHeight),
            weight: registerWeight,
            goal: registerGoal,
            gymAvail: gymAvailability,
            gymFreq: gymFreq,
            gymDays: gymDays,
            userRes: userRes,
          });
          createWorkout(gymAvailability, gymDays, uid);
          createDiet(
            registerBornDate,
            registerWeight,
            registerHeight,
            registerSex,
            registerGoal,
            userRes,
            uid
          );
          setTimeout(() => {
            navigateTo("/");
          }, 1000);
        } catch (error) {
          if (error.code == "auth/weak-password") {
            setStep(0);
            throw new getException("Sua senha deve ter mais de 6 caracteres!");
          }
          if (error.code == "auth/email-already-in-use") {
            setStep(0);
            throw new getException("Este E-mail já esta em uso!");
          }
          throw error;
        }
      }
    }
  }

  return (
    <div className={styles.body}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ style: { fontFamily: "Segoe UI" } }}
      />
      <div className={styles.bodyLeftSide}>
        <img width="70%" src={AbacateAlongamento} alt="" />
      </div>
      <img className={styles.wave} src={LeftWave} alt="" />
      <div className={styles.bodyRightSide}>
        <div className={styles.logoDiv} style={{ width: "100%" }}>
          <Link to="/">
            <img className={styles.logo} src={Logo} width="200px" alt="" />
          </Link>
        </div>
        {step == 0 ? (
          <EmailStep
            tryRegisterUser={tryRegisterUser}
            loginWithGoogle={loginWithGoogle}
          />
        ) : (
          <UserInfoStep tryRegisterUser={tryRegisterUser} />
        )}
      </div>
    </div>
  );
};

export default SignUp;
