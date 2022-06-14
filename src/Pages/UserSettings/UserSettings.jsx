import React, { useEffect, useState, useContext } from "react";
import "./UserSettings.css";

import Navbar from "../../components/Navbar/Navbar";

import userPhoto from "./../../images/perfil-icon.png";

import { db } from "../../services/firebase-config";
import { auth } from "../../services/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

import { AuthContext } from "./../../contexts/AuthContext";

import LineSpace from "../../components/LineSpace/LineSpace";
import Button from "../../components/Button/Button";
import Footer from "./../../components/Footer/Footer";

const UserSettings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");

  const { user, setUser, userInformation, setUserInformation } =
    useContext(AuthContext);
  const userCollectionRef = collection(db, "users");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    console.log(user);
  }, []);

  useEffect(() => {
    async function getUserDocs() {
      if (user != undefined) {
        const data = await getDocs(userCollectionRef);
        const UserInfos = data.docs.find((element) => element.id == user.uid);
        setName(
          UserInfos._document.data.value.mapValue.fields.name.stringValue
        );
        setEmail(
          UserInfos._document.data.value.mapValue.fields.email.stringValue
        );
        setDate(
          UserInfos._document.data.value.mapValue.fields.date.stringValue
        );
        setSex(UserInfos._document.data.value.mapValue.fields.sex.stringValue);
        setWeight(
          UserInfos._document.data.value.mapValue.fields.weight.stringValue
        );
        setHeight(
          UserInfos._document.data.value.mapValue.fields.height.stringValue
        );
        setGoal(
          UserInfos._document.data.value.mapValue.fields.goal.stringValue
        );
        setUserInformation(UserInfos);
      }
    }
    getUserDocs();
    console.log(userInformation);
  }, [user]);

  return (
    <>
      <Navbar />
      <h2 className="user-settings-subtitle">Configurações da sua Conta:</h2>
      <div className="userSettings-body">
        <img src={userPhoto} width="200px" alt="" />
        <div className="userSettings-texts-left-side">
          <div className="div-text-inline">
            <h4 className="user-title-info">Nome:</h4>
            <h4 className="user-info">{name}</h4>
          </div>
          <div className="div-text-inline">
            <h4 className="user-title-info">Email:</h4>
            <h4 className="user-info">{email}</h4>
          </div>
          <div className="div-text-inline">
            <h4 className="user-title-info">Data de Nascimento:</h4>
            <h4 className="user-info">{date.split("-").reverse().join("")}</h4>
          </div>
          <div className="div-text-inline">
            <h4 className="user-title-info">Sexo:</h4>
            <h4 className="user-info">
              {sex == "M" ? "Masculino" : "Feminino"}
            </h4>
          </div>
        </div>
        <div className="userSettings-texts-right-side">
          <div className="div-text-inline">
            <h4 className="user-title-info">Peso:</h4>
            <h4 className="user-info">{`${weight}Kg`}</h4>
          </div>
          <div className="div-text-inline">
            <h4 className="user-title-info">Objetivo:</h4>
            <h4 className="user-info">
              {goal == "G" ? "Ganhar Massa" : "Perder Peso"}
            </h4>
          </div>
          <div className="div-text-inline">
            <h4 className="user-title-info">Altura:</h4>
            <h4 className="user-info">{`${height}cm`}</h4>
          </div>
        </div>
      </div>
      <div className="account-options-body">
        <div className="account-question-body">
          <div className="account-texts">
            <h2 className="account-title">Alterar Nome:</h2>
            <h3 className="account-subtitle">
              Enviaremos um e-mail para você alterar o seu nome.
            </h3>
          </div>
          <Button
            id="change-name-button"
            background="#C44545"
            color="white"
            onClick=""
          >
            Alterar nome
          </Button>
        </div>
        <LineSpace width="80%" margin="40px" />
        <div className="account-question-body">
          <div className="account-texts">
            <h2 className="account-title">Alterar Senha:</h2>
            <h3 className="account-subtitle">
              Enviaremos um e-mail para você alterar a sua senha.
            </h3>
          </div>
          <Button
            id="change-name-button"
            background="#C44545"
            color="white"
            onClick=""
          >
            Alterar senha
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserSettings;
