import "./Register.css";
import React, { useState, useContext } from "react";

import AbacateAlongamento from "./../../images/AbacateAlongamento1.png";
import Logo from "./../../images/NemesisV1.1.png";
import LeftWave from "./../../images/wave-left.png";

import Button from "./../../components/Button/Button";
import Input from "./../../components/Input/Input";

import { Link, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./../../services/firebase-config";
import { setDoc, doc, updateDoc } from "firebase/firestore";

import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

const Register = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerConfirmEmail, setRegisterConfirmEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerBornDate, setRegisterBornDate] = useState("");
  const [registerSex, setRegisterSex] = useState("");
  const [registerHeight, setRegisterHeight] = useState("");
  const [registerWeight, setRegisterWeight] = useState("");
  const [registerGoal, setRegisterGoal] = useState("");
  const [gymAvailability, setGymAvailability] = useState("");
  const [gymDays, setGymDays] = useState("");

  const [nextPage, setNextPage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userUID, setUserUID] = useState("");

  const navigateTo = useNavigate();

  moment().format();

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

  function trySetGymSpecs() {
    toast.promise(setGymSpecs(), {
      loading: "Carregando...",
      success: "Conta Criada!",
      error: (err) => err.message.toString(),
    });
  }

  async function setGymSpecs() {
    try {
      if ((gymAvailability, gymDays == "")) {
        throw new getException("Não deixe campos vazios!");
      }
      await updateDoc(doc(db, "users", userUID), {
        gymAvail: gymAvailability,
        gymDays: gymDays,
      });
      setTimeout(() => {
        navigateTo("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  function tryRegisterUser(widthScreen) {
    if (widthScreen <= 1100) {
      if (nextPage) {
        toast.promise(RegisterUser(widthScreen), {
          loading: "Carregando...",
          success: "Apenas mais uma etapa...",
          error: (err) => err.message.toString(),
        });
      } else {
        RegisterUser(widthScreen);
      }
    } else {
      toast.promise(RegisterUser(widthScreen), {
        loading: "Carregando...",
        success: "Apenas mais uma etapa..",
        error: (err) => err.message.toString(),
      });
    }
  }

  const RegisterUser = async (screenSize) => {
    if (screenSize >= 1100) {
      try {
        if (
          (registerName,
          registerEmail,
          registerConfirmEmail,
          registerPassword,
          registerConfirmPassword,
          registerBornDate,
          registerSex,
          registerHeight,
          registerWeight,
          registerGoal == "")
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
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        const uid = user.user.uid;
        setUserUID(uid);
        await setDoc(doc(db, "users", uid), {
          uid: uid,
          name: registerName,
          email: registerEmail,
          date: registerBornDate,
          sex: registerSex,
          height: handleHeightNumber(registerHeight),
          weight: registerWeight,
          goal: registerGoal,
        });
        setTimeout(() => {
          setIsLoggedIn(true);
        }, 2000);
      } catch (error) {
        if (error.code == "auth/weak-password") {
          throw new getException("Sua senha deve ter mais de 6 caracteres!");
        }
        if (error.code == "auth/email-already-in-use") {
          throw new getException("Este E-mail já esta em uso!");
        }
        throw error;
      }
    } else {
      if (!nextPage) {
        if (
          (registerName,
          registerEmail,
          registerConfirmEmail,
          registerPassword,
          registerConfirmPassword == "")
        ) {
          toast.error("Não deixe campos vazios!");
          return;
        }
        if (stringContainsNumber(registerName)) {
          toast.error("Insira um nome valido!");
          return;
        }
        if (registerEmail != registerConfirmEmail) {
          toast.error("Os E-mails não coincidem!");
          return;
        }
        if (registerPassword != registerConfirmPassword) {
          toast.error("As senhas não coincidem!");
          return;
        }
        toast.success("Só mais uma etapa...");
        setNextPage(true);
        document.getElementById("register-email-side").style.display = "none";
        document.getElementById("register-info-side").style.display = "flex";
      } else {
        if (
          (registerBornDate,
          registerSex,
          registerHeight,
          registerWeight,
          registerGoal == "")
        ) {
          toast.error("Não deixe campos vazios!");
          return;
        }
        try {
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

          const user = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
          );
          const uid = user.user.uid;
          await setDoc(doc(db, "users", uid), {
            uid: uid,
            name: registerName,
            email: registerEmail,
            Date: registerBornDate,
            Sex: registerSex,
            Height: handleHeightNumber(registerHeight),
            Weight: registerWeight,
            Goal: registerGoal,
          });
          setTimeout(() => {
            setIsLoggedIn(true);
          }, 2000);
        } catch (error) {
          if (error.code == "auth/weak-password") {
            throw new getException("Sua senha deve ter mais de 6 caracteres!");
          }
          if (error.code == "auth/email-already-in-use") {
            throw new getException("Este E-mail já esta em uso!");
          }
          throw error;
        }
      }
    }
  };
  return (
    <div className="register-body">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ style: { fontFamily: "Segoe UI" } }}
      />
      <div className="register-left-side">
        <img width="70%" src={AbacateAlongamento} alt="" />
      </div>
      <img className="wave" src={LeftWave} alt="" />
      <div className="register-right-side">
        <div className="logo-div" style={{ width: "100%" }}>
          <Link to="/">
            <img className="register-logo" src={Logo} width="200px" alt="" />
          </Link>
        </div>
        {!isLoggedIn ? (
          <>
            <form className="register-form">
              <div className="register-email-side" id="register-email-side">
                <Input
                  type="text"
                  size="lg"
                  placeholder="Nome Completo"
                  onChange={(event) => {
                    setRegisterName(event.target.value);
                  }}
                />
                <Input
                  type="email"
                  size="lg"
                  placeholder="Insira seu E-mail"
                  onChange={(event) => {
                    setRegisterEmail(event.target.value);
                  }}
                />
                <Input
                  type="email"
                  size="lg"
                  placeholder="Confirme seu E-mail"
                  onChange={(event) => {
                    setRegisterConfirmEmail(event.target.value);
                  }}
                />
                <Input
                  type="password"
                  size="lg"
                  placeholder="Sua Senha"
                  onChange={(event) => {
                    setRegisterPassword(event.target.value);
                  }}
                />
                <Input
                  type="password"
                  size="lg"
                  placeholder="Confirme a sua Senha"
                  onChange={(event) => {
                    setRegisterConfirmPassword(event.target.value);
                  }}
                />
              </div>
              <div className="register-info-side" id="register-info-side">
                <Input
                  type="date"
                  size="sm"
                  placeholder="Data de Nascimento"
                  onChange={(event) => {
                    setRegisterBornDate(event.target.value);
                  }}
                  min="1942-01-01"
                />
                <select
                  className="select"
                  onChange={(event) => {
                    setRegisterSex(event.target.value);
                  }}
                >
                  <option value="" selected disabled hidden>
                    Sexo
                  </option>
                  <option value="M">Masculino</option>
                  <option value="N">Feminino</option>
                  <option value="NA">Prefiro não Informar</option>
                </select>
                <Input
                  type="number"
                  size="sm"
                  placeholder="Peso (Kg)"
                  onChange={(event) => {
                    setRegisterWeight(event.target.value);
                  }}
                />
                <Input
                  type="number"
                  size="sm"
                  placeholder="Altura"
                  onChange={(event) => {
                    setRegisterHeight(event.target.value);
                  }}
                />
                <select
                  className="select"
                  onChange={(event) => {
                    setRegisterGoal(event.target.value);
                  }}
                >
                  <option value="" selected disabled hidden>
                    Objetivo
                  </option>
                  <option value="P">Perda de Peso</option>
                  <option value="G">Ganho de Massa</option>
                </select>
              </div>
            </form>
            <Button
              id="register-button"
              type="submit"
              onClick={() => tryRegisterUser(window.screen.width)}
              background="#45c4b0"
              color="white"
              height="40px"
              shadow="2px 6px 4px rgba(0, 0, 0, 0.25)"
            >
              Cadastre-se
            </Button>
            <Link className="link-text" to="/Register">
              <i className="link-text">Já tem uma conta? Clique Aqui!</i>
            </Link>
          </>
        ) : (
          <>
            <form className="form-gym-specs">
              <div className="gym-specs-text">
                <h2 className="gym-specs-title">Certo, estamos quase lá...</h2>
                <h2 className="gym-specs-subtitle">
                  Por favor, preencha os seguintes dados:
                </h2>
              </div>
              <select
                className="select gymspecs"
                onChange={(event) => {
                  setGymAvailability(event.target.value);
                }}
              >
                <option value="" selected disabled hidden>
                  Teria uma academia disponível?
                </option>
                <option value="GYM-S">Sim</option>
                <option value="GYM-N">Não</option>
              </select>
              <select
                className="select gymspecs"
                onChange={(event) => {
                  setGymDays(event.target.value);
                }}
              >
                <option value="" selected disabled hidden>
                  Dias disponíveis para treino:
                </option>
                <option value="GYM-DAYS-2">2</option>
                <option value="GYM-DAYS-3">3</option>
                <option value="GYM-DAYS-4">4</option>
                <option value="GYM-DAYS-5">5</option>
                <option value="GYM-DAYS-6">6</option>
              </select>
            </form>
            <Button
              id="register-button"
              type="submit"
              onClick={() => trySetGymSpecs()}
              background="#45c4b0"
              color="white"
              height="40px"
              shadow="2px 6px 4px rgba(0, 0, 0, 0.25)"
            >
              Cadastre-se
            </Button>
            <Link className="link-text" to="/Login">
              <i className="link-text">Já tem uma conta? Clique Aqui!</i>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
