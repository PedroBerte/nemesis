import React, { useEffect, useState, useContext } from "react";
import "./UserSettings.css";

import userPhoto from "./../../images/perfil-icon.png";
import smallLogo from "./../../images/Logo.png";

import { db } from "../../services/firebase-config";
import { auth } from "../../services/firebase-config";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import { AuthContext } from "./../../contexts/AuthContext";

import Navbar from "../../components/Navbar/Navbar";
import LineSpace from "../../components/LineSpace/LineSpace";
import Button from "../../components/Button/Button";
import Footer from "./../../components/Footer/Footer";

import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";
import Input from "../../components/Input/Input";

Modal.setAppElement("#root");

const UserSettings = () => {
  const navigateTo = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [date, setDate] = useState("");
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");

  const { user, setUser, userInformation, setUserInformation } =
    useContext(AuthContext);
  const userCollectionRef = collection(db, "users");

  const [removeAccountIsOpen, setRemoveAccountIsOpen] = useState(false);
  const [readMoreModalIsOpen, setReadModalIsOpen] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    if (user == undefined) {
      navigateTo("/");
    }
  }, []);

  useEffect(() => {
    async function getUserDocs() {
      if (user != undefined) {
        const data = await getDocs(userCollectionRef);
        const UserInfos = data.docs.find((element) => element.id == user.uid)
          ._document.data.value.mapValue.fields;
        setName(UserInfos.name.stringValue);
        setEmail(UserInfos.email.stringValue);
        setDate(UserInfos.date.stringValue);
        setSex(UserInfos.sex.stringValue);
        setWeight(UserInfos.weight.stringValue);
        setHeight(UserInfos.height.stringValue);
        setGoal(UserInfos.goal.stringValue);
        setUserInformation(UserInfos);
      }
    }
    getUserDocs();
  }, [user]);

  function changePassword() {
    sendPasswordResetEmail(auth, email).then(() => {
      toast.success("E-mail enviado!");
    });
  }

  async function handleDeleteUser() {
    setUser(auth.currentUser);
    console.log(user.uid);
    const uid = user.uid;
    if (confirmationEmail == email) {
      deleteUser(user)
        .then(() => {
          toast.success("Conta Apagada com sucesso!");
        })
        .catch((error) => {
          toast.error(error);
          return;
        });
      await deleteDoc(doc(db, "users", uid));
      setTimeout(() => {
        navigateTo("/");
      }, 1500);
    } else {
      toast.error("E-mail inválido!");
    }
  }

  Modal.setAppElement("#root");

  function openRemoveModal() {
    setRemoveAccountIsOpen(true);
  }
  function closeRemoveModal() {
    setRemoveAccountIsOpen(false);
  }

  function openReadMoreModal() {
    setReadModalIsOpen(true);
  }
  function closeReadMoreModal() {
    setReadModalIsOpen(false);
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
    },
  };

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ style: { fontFamily: "Segoe UI" } }}
      />
      <Navbar />

      {/* Inicio do modal das informações */}

      <Modal
        isOpen={readMoreModalIsOpen}
        onRequestClose={closeReadMoreModal}
        style={customStyles}
        closeTimeoutMS={200}
      >
        <div className="modal-header">
          <h3 className="modal-title">Informações da conta:</h3>
          <img
            className="modal-small-logo"
            width="35px"
            src={smallLogo}
            alt=""
          />
        </div>
        <div className="modal-content">
          <img src={userPhoto} width="100px" alt="" />
          {name == "" ? (
            <Skeleton
              style={{ marginBottom: "7px" }}
              width="250px"
              height="1rem"
            />
          ) : (
            <div className="div-text-user-name">
              <h4 className="user-info">{name}</h4>
            </div>
          )}
          <div className="modal-responsive-infos">
            {email == "" ? (
              <Skeleton
                style={{ marginBottom: "7px" }}
                width="250px"
                height="1rem"
              />
            ) : (
              <div className="div-text-inline">
                <h4 className="user-title-info-modal">Email:</h4>
                <h4 className="user-info-modal">{email}</h4>
              </div>
            )}
            {date == "" ? (
              <Skeleton
                style={{ marginBottom: "7px" }}
                width="250px"
                height="1rem"
              />
            ) : (
              <div className="div-text-inline">
                <h4 className="user-title-info-modal">Data de Nascimento:</h4>
                <h4 className="user-info-modal">
                  {new Date(date.replace("-", "/")).toLocaleDateString("pt-BR")}
                </h4>
              </div>
            )}
            {sex == "" ? (
              <Skeleton
                style={{ marginBottom: "7px" }}
                width="250px"
                height="1rem"
              />
            ) : (
              <div className="div-text-inline">
                <h4 className="user-title-info-modal">Sexo:</h4>
                <h4 className="user-info-modal">
                  {sex == "M" ? "Masculino" : "Feminino"}
                </h4>
              </div>
            )}
            {weight == "" ? (
              <Skeleton
                style={{ marginBottom: "12px" }}
                width="180px"
                height="1rem"
              />
            ) : (
              <div className="div-text-inline">
                <h4 className="user-title-info-modal">Peso:</h4>
                <h4 className="user-info-modal">{`${weight}Kg`}</h4>
              </div>
            )}
            {goal == "" ? (
              <Skeleton
                style={{ marginBottom: "12px" }}
                width="180px"
                height="1rem"
              />
            ) : (
              <div className="div-text-inline">
                <h4 className="user-title-info-modal">Objetivo:</h4>
                <h4 className="user-info-modal">
                  {goal == "G" ? "Ganhar Massa" : "Perder Peso"}
                </h4>
              </div>
            )}
            {height == "" ? (
              <Skeleton
                style={{ marginBottom: "12px" }}
                width="180px"
                height="1rem"
              />
            ) : (
              <div className="div-text-inline">
                <h4 className="user-title-info-modal">Altura:</h4>
                <h4 className="user-info-modal">{`${height}cm`}</h4>
              </div>
            )}
          </div>
          <p className="ad">
            Baixe o nosso aplicativo para mais funcionalidades!
          </p>
        </div>
      </Modal>

      {/* Fim do modal das informações */}

      {/* Inicio do modal para apagar a conta */}

      <Modal
        isOpen={removeAccountIsOpen}
        onRequestClose={closeRemoveModal}
        style={customStyles}
        closeTimeoutMS={200}
      >
        <div className="modal-header">
          <div className="modal-texts">
            <h2 className="modal-title">Você tem certeza disso?</h2>
            <h4 className="modal-subtitle">
              Se você apagar a sua conta, nunca mais terá acesso à ela!
            </h4>
          </div>
          <img
            className="modal-small-logo"
            width="35px"
            src={smallLogo}
            alt=""
          />
        </div>
        <Input
          type="email"
          size="lg"
          placeholder={email}
          onChange={(event) => {
            setConfirmationEmail(event.target.value);
          }}
        />
        <div className="modal-div-input-subtitle">
          <h5 className="modal-input-subtitle">
            Insira seu E-mail para confirmar a exclusão da conta.
          </h5>
        </div>
        <div className="modal-buttons">
          <Button
            id="modal-button-cancel"
            type="default"
            shadow="2px 4px 4px rgba(0, 0, 0, 0.20)"
            onClick={() => closeModal()}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => handleDeleteUser()}
            type="warning"
            shadow="2px 4px 4px rgba(0, 0, 0, 0.20)"
          >
            Apagar Conta
          </Button>
        </div>
      </Modal>

      {/* Fim do modal para apagar a conta */}

      <h2 className="user-settings-subtitle">Configurações da sua Conta:</h2>

      {/* Inicio dos elementos Responsivos */}

      <div className="user-settings-body-responsive">
        {user == undefined ? (
          <Skeleton width="130px" height="130px" circle="true" />
        ) : (
          <img src={userPhoto} width="130px" alt="" />
        )}
        <div className="user-settings-texts-responsive">
          {name == "" ? (
            <Skeleton
              style={{ marginBottom: "7px" }}
              width="250px"
              height="1rem"
            />
          ) : (
            <div className="div-text-inline">
              <p className="user-info">{name}</p>
            </div>
          )}
          {email == "" ? (
            <Skeleton
              style={{ marginBottom: "7px" }}
              width="250px"
              height="1rem"
            />
          ) : (
            <div className="div-text-inline">
              <p className="user-info">{email}</p>
            </div>
          )}
          {date == "" ? (
            <Skeleton
              style={{ marginBottom: "7px" }}
              width="250px"
              height="1rem"
            />
          ) : (
            <div className="div-text-inline">
              <p className="user-info">
                Nascido em:{" "}
                {new Date(date.replace("-", "/")).toLocaleDateString("pt-BR")}
              </p>
            </div>
          )}
          <p
            className="read-more-user-settings"
            onClick={() => openReadMoreModal()}
          >
            <i>Ler mais...</i>
          </p>
        </div>
      </div>

      {/* Fim dos elementos Responsivos */}

      <div className="userSettings-body">
        {user == undefined ? (
          <Skeleton width="200px" height="200px" circle="true" />
        ) : (
          <img src={userPhoto} width="200px" alt="" />
        )}
        <div className="userSettings-texts-left-side">
          {name == "" ? (
            <Skeleton
              style={{ marginBottom: "7px" }}
              width="250px"
              height="1rem"
            />
          ) : (
            <div className="div-text-inline">
              <h4 className="user-title-info">Nome:</h4>
              <h4 className="user-info">{name}</h4>
            </div>
          )}
          {email == "" ? (
            <Skeleton
              style={{ marginBottom: "7px" }}
              width="250px"
              height="1rem"
            />
          ) : (
            <div className="div-text-inline">
              <h4 className="user-title-info">Email:</h4>
              <h4 className="user-info">{email}</h4>
            </div>
          )}
          {date == "" ? (
            <Skeleton
              style={{ marginBottom: "7px" }}
              width="250px"
              height="1rem"
            />
          ) : (
            <div className="div-text-inline">
              <h4 className="user-title-info">Data de Nascimento:</h4>
              <h4 className="user-info">
                {new Date(date.replace("-", "/")).toLocaleDateString("pt-BR")}
              </h4>
            </div>
          )}
          {sex == "" ? (
            <Skeleton
              style={{ marginBottom: "7px" }}
              width="250px"
              height="1rem"
            />
          ) : (
            <div className="div-text-inline">
              <h4 className="user-title-info">Sexo:</h4>
              <h4 className="user-info">
                {sex == "M" ? "Masculino" : "Feminino"}
              </h4>
            </div>
          )}
        </div>
        <div className="userSettings-texts-right-side">
          {weight == "" ? (
            <Skeleton
              style={{ marginBottom: "12px" }}
              width="180px"
              height="1rem"
            />
          ) : (
            <div className="div-text-inline">
              <h4 className="user-title-info">Peso:</h4>
              <h4 className="user-info">{`${weight}Kg`}</h4>
            </div>
          )}
          {goal == "" ? (
            <Skeleton
              style={{ marginBottom: "12px" }}
              width="180px"
              height="1rem"
            />
          ) : (
            <div className="div-text-inline">
              <h4 className="user-title-info">Objetivo:</h4>
              <h4 className="user-info">
                {goal == "G" ? "Ganhar Massa" : "Perder Peso"}
              </h4>
            </div>
          )}
          {height == "" ? (
            <Skeleton
              style={{ marginBottom: "12px" }}
              width="180px"
              height="1rem"
            />
          ) : (
            <div className="div-text-inline">
              <h4 className="user-title-info">Altura:</h4>
              <h4 className="user-info">{`${height}cm`}</h4>
            </div>
          )}
        </div>
      </div>
      <div className="account-options-body">
        <div className="account-question-body">
          <div className="account-texts">
            <h3 className="account-title">Alterar Senha:</h3>
            <h4 className="account-subtitle">
              Enviaremos um e-mail para você alterar a sua senha.
            </h4>
          </div>
          <Button
            id="change-name-button"
            type="warning"
            onClick={() => changePassword()}
          >
            Alterar senha
          </Button>
        </div>
        <LineSpace width="80%" margin="40px" />
        <div className="account-question-body">
          <div className="account-texts">
            <h3 className="account-title">Excluir conta:</h3>
            <h4 className="account-subtitle">
              Exclua todos os seus dados, preferências e acesso a conta.
            </h4>
          </div>
          <Button
            id="change-name-button"
            type="warning"
            onClick={() => openRemoveModal()}
          >
            Excluir conta
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserSettings;
