import React, { useEffect, useState, useContext } from "react";
import styles from "./UserSettings.module.css";
import "./ModalStyle.css";

import userPhoto from "./../../images/perfil-icon.png";
import smallLogo from "./../../images/Logo.png";

import { db } from "../../services/firebase-config";
import { auth } from "../../services/firebase-config";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import { collection, getDoc, deleteDoc, doc } from "firebase/firestore";

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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsLoading(false);
      } else {
        navigateTo("/");
      }
      setIsLoading(currentUser);
    });
  }, []);

  useEffect(() => {
    async function getUserDocs() {
      if (user != undefined) {
        const userDocs = await getDoc(doc(db, "users", user.uid));
        const UserInfos = userDocs.data();
        setName(UserInfos.name);
        setEmail(UserInfos.email);
        setDate(UserInfos.date);
        setSex(UserInfos.sex);
        setWeight(UserInfos.weight);
        setHeight(UserInfos.height);
        setGoal(UserInfos.goal);
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
      maxWidth: window.matchMedia("(min-width: 768px)").matches ? "50%" : "",
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
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Informações da conta:</h3>
          <img
            className={styles.modalSmallLogo}
            width="35px"
            src={smallLogo}
            alt=""
          />
        </div>
        <div className={styles.modalContent}>
          <img src={userPhoto} width="100px" alt="" />
          {name == "" ? (
            <Skeleton
              style={{ marginBottom: "7px" }}
              width="250px"
              height="1rem"
            />
          ) : (
            <div className={styles.divTextUserName}>
              <h4 className={styles.userInfo}>{name}</h4>
            </div>
          )}
          <div className={styles.modalResponsiveInfos}>
            {email == "" ? (
              <Skeleton
                style={{ marginBottom: "7px" }}
                width="250px"
                height="1rem"
              />
            ) : (
              <div className={styles.divTextInline}>
                <h4 className={styles.userTitleInfoModal}>Email:</h4>
                <h4 className={styles.userInfoModal}>{email}</h4>
              </div>
            )}
            {date == "" ? (
              <Skeleton
                style={{ marginBottom: "7px" }}
                width="250px"
                height="1rem"
              />
            ) : (
              <div className={styles.divTextInline}>
                <h4 className={styles.userTitleInfoModal}>
                  Data de Nascimento:
                </h4>
                <h4 className={styles.userInfoModal}>
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
              <div className={styles.divTextInline}>
                <h4 className={styles.userTitleInfoModal}>Sexo:</h4>
                <h4 className={styles.userInfoModal}>
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
              <div className={styles.divTextInline}>
                <h4 className={styles.userTitleInfoModal}>Peso:</h4>
                <h4 className={styles.userInfoModal}>{`${weight}Kg`}</h4>
              </div>
            )}
            {goal == "" ? (
              <Skeleton
                style={{ marginBottom: "12px" }}
                width="180px"
                height="1rem"
              />
            ) : (
              <div className={styles.divTextInline}>
                <h4 className={styles.userTitleInfoModal}>Objetivo:</h4>
                <h4 className={styles.userInfoModal}>
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
              <div className={styles.divTextInline}>
                <h4 className={styles.userTitleInfoModal}>Altura:</h4>
                <h4 className={styles.userInfoModal}>{`${height}cm`}</h4>
              </div>
            )}
          </div>
          <p className={styles.ad}>
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
        <div className={styles.modalHeader}>
          <div className={styles.modalTexts}>
            <h2 className={styles.modalTitle}>Você tem certeza disso?</h2>
            <h4 className={styles.modalSubtitle}>
              Se você apagar a sua conta, nunca mais terá acesso à ela!
            </h4>
          </div>
          <img
            className={styles.modalSmallLogo}
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
        <div className={styles.modalDivInputSubtitle}>
          <h5 className={styles.modalInputSubtitle}>
            Insira seu E-mail para confirmar a exclusão da conta.
          </h5>
        </div>
        <div className={styles.modalButtons}>
          <Button
            id={styles.modalButtonCancel}
            type="default"
            shadow="2px 4px 4px rgba(0, 0, 0, 0.20)"
            onClick={() => closeRemoveModal()}
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

      <h2 className={styles.subtitle}>Configurações da sua Conta:</h2>

      {/* Inicio dos elementos Responsivos */}

      <div className={styles.bodyResponsive}>
        {user == undefined ? (
          <Skeleton width="130px" height="130px" circle="true" />
        ) : (
          <img src={userPhoto} width="130px" alt="" />
        )}
        <div className={styles.textsResponsive}>
          {name == "" ? (
            <Skeleton
              style={{ marginBottom: "7px" }}
              width="250px"
              height="1rem"
            />
          ) : (
            <div className={styles.divTextInline}>
              <p className={styles.userInfo}>{name}</p>
            </div>
          )}
          {email == "" ? (
            <Skeleton
              style={{ marginBottom: "7px" }}
              width="250px"
              height="1rem"
            />
          ) : (
            <div className={styles.divTextInline}>
              <p className={styles.userInfo}>{email}</p>
            </div>
          )}
          {date == "" ? (
            <Skeleton
              style={{ marginBottom: "7px" }}
              width="250px"
              height="1rem"
            />
          ) : (
            <div className={styles.divTextInline}>
              <p className={styles.userInfo}>
                Nascido em:{" "}
                {new Date(date.replace("-", "/")).toLocaleDateString("pt-BR")}
              </p>
            </div>
          )}
          <p className={styles.readMore} onClick={() => openReadMoreModal()}>
            <i>Ler mais...</i>
          </p>
        </div>
      </div>

      {/* Fim dos elementos Responsivos */}

      <div className={styles.body}>
        {user == undefined ? (
          <Skeleton width="200px" height="200px" circle="true" />
        ) : (
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              backgroundColor: "red",
              //overflow: "hidden",
            }}
          >
            {/* <img src={userPhoto} width="200px" alt="" /> */}
            <label className={styles.label} for="oi">
              <input id="oi" type="file" style={{ display: "none" }} />
              <h2>oi</h2>
            </label>
          </div>
        )}
        <div className={styles.textsLeftSide}>
          {name == "" ? (
            <Skeleton
              style={{ marginBottom: "7px" }}
              width="250px"
              height="1rem"
            />
          ) : (
            <div className={styles.divTextInline}>
              <h4 className={styles.userTitleInfo}>Nome:</h4>
              <h4 className={styles.userInfo}>{name}</h4>
            </div>
          )}
          {email == "" ? (
            <Skeleton
              style={{ marginBottom: "7px" }}
              width="250px"
              height="1rem"
            />
          ) : (
            <div className={styles.divTextInline}>
              <h4 className={styles.userTitleInfo}>Email:</h4>
              <h4 className={styles.userInfo}>{email}</h4>
            </div>
          )}
          {date == "" ? (
            <Skeleton
              style={{ marginBottom: "7px" }}
              width="250px"
              height="1rem"
            />
          ) : (
            <div className={styles.divTextInline}>
              <h4 className={styles.userTitleInfo}>Data de Nascimento:</h4>
              <h4 className={styles.userInfo}>
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
            <div className={styles.divTextInline}>
              <h4 className={styles.userTitleInfo}>Sexo:</h4>
              <h4 className={styles.userInfo}>
                {sex == "M" ? "Masculino" : "Feminino"}
              </h4>
            </div>
          )}
        </div>
        <div className={styles.textsRightSide}>
          {weight == "" ? (
            <Skeleton
              style={{ marginBottom: "12px" }}
              width="180px"
              height="1rem"
            />
          ) : (
            <div className={styles.divTextInline}>
              <h4 className={styles.userTitleInfo}>Peso:</h4>
              <h4 className={styles.userInfo}>{`${weight}Kg`}</h4>
            </div>
          )}
          {goal == "" ? (
            <Skeleton
              style={{ marginBottom: "12px" }}
              width="180px"
              height="1rem"
            />
          ) : (
            <div className={styles.divTextInline}>
              <h4 className={styles.userTitleInfo}>Objetivo:</h4>
              <h4 className={styles.userInfo}>
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
            <div className={styles.divTextInline}>
              <h4 className={styles.userTitleInfo}>Altura:</h4>
              <h4 className={styles.userInfo}>{`${String(height)}cm`}</h4>
            </div>
          )}
        </div>
      </div>
      <div className={styles.accountOptionsBody}>
        <div className={styles.accountQuestionBody}>
          <div className={styles.accountTexts}>
            <h3 className={styles.accountTitle}>Alterar Senha:</h3>
            <h4 className={styles.accountSubtitle}>
              Enviaremos um e-mail para você alterar a sua senha.
            </h4>
          </div>
          <Button
            id={styles.changeNameButton}
            type="warning"
            onClick={() => changePassword()}
          >
            Alterar senha
          </Button>
        </div>
        <LineSpace width="80%" margin="40px" />
        <div className={styles.accountQuestionBody}>
          <div className={styles.accountTexts}>
            <h3 className={styles.accountTitle}>Excluir conta:</h3>
            <h4 className={styles.accountSubtitle}>
              Exclua todos os seus dados, preferências e acesso a conta.
            </h4>
          </div>
          <Button
            id={styles.changeNameButton}
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
