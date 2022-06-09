import "./Register.css";
import React, { useState, useContext } from "react";

import AbacateAlongamento from "./../../images/AbacateAlongamento1.png";
import Logo from "./../../images/NemesisV1.1.png";
import LeftWave from "./../../images/wave-left.png";

import Button from "./../../components/Button/Button";
import Input from "./../../components/Input/Input";

import { Link, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./../../services/firebase-config";
import { setDoc, doc } from "firebase/firestore";

import { AuthContext } from "./../../contexts/AuthContext";

import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

const Register = () => {
  moment().format();

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

  const { user, setUser, userInformation, setUserInformation } =
    useContext(AuthContext);

  const [nextPage, setNextPage] = useState(false);

  const navigateTo = useNavigate();

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

  function tryRegisterUser(widthScreen) {
    if (widthScreen <= 1100) {
      if (nextPage) {
        toast.promise(RegisterUser(widthScreen), {
          loading: "Carregando...",
          success: "Logado!",
          error: (err) => err.message.toString(),
        });
      } else {
        RegisterUser(widthScreen);
      }
    } else {
      toast.promise(RegisterUser(widthScreen), {
        loading: "Carregando...",
        success: "Logado!",
        error: (err) => err.message.toString(),
      });
    }
  }

  function getException(message) {
    this.message = message;
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
          navigateTo("/");
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
            navigateTo("/");
          }, 1800);
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
      <div>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{ style: { fontFamily: "Segoe UI" } }}
        />
      </div>
      <div className="register-left-side">
        <img width="70%" src={AbacateAlongamento} alt="" />
      </div>
      <img className="wave" src={LeftWave} alt="" />
      <div className="register-right-side">
        <div className="logo-div" style={{ width: "100%" }}>
          <Link style={{ marginTop: "0px" }} to="/">
            <img className="register-logo" src={Logo} width="200px" alt="" />
          </Link>
        </div>
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
              <option value="FR">Força e Resistencia</option>
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
        <Link className="link-text" to="/Login">
          <i className="link-text">Já tem uma conta? Clique Aqui!</i>
        </Link>
      </div>
    </div>
  );
};

export default Register;
