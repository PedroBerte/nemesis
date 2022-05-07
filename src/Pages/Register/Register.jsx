import "./Register.css";
import React, { useState } from "react";

import AbacateAlongamento from "./../../images/AbacateAlongamento1.png";
import Logo from "./../../images/NemesisV1.1.png";
import LeftWave from "./../../images/wave-left.png";

import Button from "./../../components/Button/Button";
import Input from "./../../components/Input/Input";

import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./../../firebase-config";
import { setDoc, doc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
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

  const [nextPage, setNextPage] = useState(false);

  const navigateTo = useNavigate();

  function stringContainsNumber(_string) {
    return /\d/.test(_string);
  }

  function getCurrentDate(minAge) {
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

    if (minAge > 0) {
      return `${year - minAge}-${formatMonth(month)}-${formatDay(day)}`;
    } else {
      return `${year}-${formatMonth(month)}-${formatDay(day)}`;
    }
  }

  const RegisterUser = async (screenSize) => {
    if (screenSize >= 1100) {
      if (
        registerName &&
        registerEmail &&
        registerConfirmEmail &&
        registerPassword &&
        registerConfirmPassword &&
        registerBornDate &&
        registerSex &&
        registerHeight &&
        registerWeight &&
        registerGoal != ""
      ) {
        if (stringContainsNumber(registerName)) {
          //name with numbers
          toast.error("Insira um nome valido!");
          return;
        }
        if (registerEmail != registerConfirmEmail) {
          //Email != confirmation
          toast.error("Os E-mails não coincidem!");
          return;
        }
        if (registerPassword != registerConfirmPassword) {
          //Senha != confirmation
          toast.error("As senhas não coincidem!");
          return;
        }
        if (String(getCurrentDate()) == registerBornDate) {
          toast.error("Insira uma data de nascimento valida!");
          return;
        }
        if (moment(registerBornDate).isAfter(getCurrentDate())) {
          toast.error("Insira uma data de nascimento valida!");
          return;
        }
        if (moment(registerBornDate).isAfter(getCurrentDate(12))) {
          toast.error(
            "Apenas pessoas com mais de 12 anos podem se cadastrar no Nemesis!"
          );
          return;
        }
        try {
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
            height: registerHeight,
            weight: registerWeight,
            goal: registerGoal,
          });
          toast.success("Conta criada! Aproveite!"); //Cria conta Web >= 1100
          setTimeout(() => {
            navigateTo("/");
          }, 1800);
        } catch (error) {
          console.log(error.code);
          if (error.code == "auth/weak-password") {
            toast.error("Sua senha deve ter mais de 6 caracteres!");
            return;
          }
          if (error.code == "auth/email-already-in-use") {
            toast.error("Este E-mail já esta em uso!");
            return;
          }
          toast.error("Algo deu errado... Tente novamente mais tarde!");
        }
      } else {
        //Caso algum parametro seja == "".
        toast.error("Não deixe campos vazios!");
      }
    } else {
      if (!nextPage) {
        if (
          registerName &&
          registerEmail &&
          registerConfirmEmail &&
          registerPassword &&
          registerConfirmPassword != ""
        ) {
          if (stringContainsNumber(registerName)) {
            toast.error("Insira um nome valido!");
            return;
          }
          if (registerEmail != registerConfirmEmail) {
            //Email != Confirmação
            toast.error("Os E-mails não coincidem!");
            return;
          }
          if (registerPassword != registerConfirmPassword) {
            //Senha != Confirmação
            toast.error("As senhas não coincidem!");
            return;
          }
          toast.success("Só mais uma etapa...");
          setNextPage(true);
          document.getElementById("register-email-side").style.display = "none";
          document.getElementById("register-info-side").style.display = "flex";
        } else {
          toast.error("Não deixe campos vazios!");
        }
      } else {
        if (
          registerBornDate &&
          registerSex &&
          registerHeight &&
          registerWeight &&
          registerGoal != ""
        ) {
          if (String(getCurrentDate()) == registerBornDate) {
            toast.error("Insira uma data de nascimento valida!");
            return;
          }
          if (moment(registerBornDate).isAfter(getCurrentDate())) {
            toast.error("Insira uma data de nascimento valida!");
            return;
          }
          if (moment(registerBornDate).isAfter(getCurrentDate(12))) {
            toast.error(
              "Apenas pessoas com mais de 12 anos podem se cadastrar no Nemesis!"
            );
            return;
          }
          try {
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
              Height: registerHeight,
              Weight: registerWeight,
              Goal: registerGoal,
            });
            toast.success("Conta criada! Aproveite!"); //Cria conta no WebMobile
            setTimeout(() => {
              navigateTo("/");
            }, 1800);
          } catch (error) {
            console.log(error.code);
            if (error.code == "auth/weak-password") {
              toast.error("Sua senha deve ter mais de 6 caracteres!");
              return;
            }
            if (error.code == "auth/email-already-in-use") {
              toast.error("Este E-mail já esta em uso!");
              return;
            }
            toast.error("Algo deu errado... Tente novamente mais tarde!");
          }
        } else {
          toast.error("Não deixe campos vazios!");
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
              min="1940-01-01"
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
              placeholder="Peso"
              onChange={(event) => {
                setRegisterHeight(event.target.value);
              }}
            />
            <Input
              type="number"
              size="sm"
              placeholder="Altura"
              onChange={(event) => {
                setRegisterWeight(event.target.value);
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
          onClick={() => RegisterUser(window.screen.width)}
          background="#45c4b0"
          color="white"
          height="40px"
          shadow="2px 6px 4px rgba(0, 0, 0, 0.25)"
        >
          Cadastre-se
        </Button>
        <Link to="/Login">
          <i className="to-login">Já tem uma conta? Clique Aqui!</i>
        </Link>
      </div>
    </div>
  );
};

export default Register;
