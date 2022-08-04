import React, { useState, useContext } from "react";
import styles from "./SignIn.module.css";

import Logo from "./../../images/NemesisV1.1.png";
import AbacateAlongamento from "./../../images/AbacateAlongamento1.png";
import RightWave from "./../../images/wave-right.png";
import Button from "../../components/Button/Button";

import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/Input/Input";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../services/firebase-config";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

import { useSignUp } from "../../contexts/SignUpContext";

import { AuthContext } from "../../contexts/AuthContext";
import googleIcon from "../../images/googleIcon.png";

import toast, { Toaster } from "react-hot-toast";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const SignIn = () => {
  const navigateTo = useNavigate();
  const provider = new GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setStep, setIsLoggedWithGoogle, isLoggedWithGoogle } =
    useSignUp();
  const userCollectionRef = collection(db, "users");

  function getException(message) {
    this.message = message;
  }

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  function trySignIn() {
    toast.promise(signIn(), {
      loading: "Carregando...",
      success: "Logado!",
      error: (err) => err.message.toString(),
    });
  }
  function trySignInWithGoogle() {
    toast.promise(signInWithGoogle(), {
      loading: "Carregando...",
      success: "Logado!",
      error: (err) => err.message.toString(),
    });
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

  async function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const newUser = result.user;
        setUser(newUser);
        const isUserAlreadyExist = await userExists(newUser);
        if (!isUserAlreadyExist) {
          toast.error("Conclua o resgistro para continuar!");
          setTimeout(() => {
            setStep(1);
            setIsLoggedWithGoogle(true);
            navigateTo("/SignUp");
          }, 1200);
        } else {
          toast.success("Bem-vindo!");
          setTimeout(() => {
            navigateTo("/");
          }, 1200);
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  const signIn = async () => {
    try {
      if ((email, password == "")) {
        throw new getException("Não deixe campos vazios!");
      }
      const newUser = await signInWithEmailAndPassword(auth, email, password);
      const data = await getDocs(userCollectionRef);
      const UserInfos = data.docs.find(
        (element) => element.id == newUser.user.uid
      );
      localStorage.setItem(
        "@Nemesis:userInformation",
        JSON.stringify(UserInfos._document.data.value.mapValue.fields)
      );
      setTimeout(() => {
        navigateTo("/");
      }, 1800);
    } catch (error) {
      if (error.code == "auth/invalid-email") {
        throw new getException("E-mail inválido!");
      }
      if (error.code == "auth/wrong-password") {
        throw new getException("Senha Incorreta!");
      }
      if (error.code == "auth/user-not-found") {
        throw new getException("Usuário não encontrado!");
      }
      throw error;
    }
  };

  return (
    <div className={styles.body}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ style: { fontFamily: "Segoe UI" } }}
      />
      <div className={styles.bodyLeftSide}>
        <Link to="/">
          <img className={styles.logo} width="230px" src={Logo} alt="" />
        </Link>
        <form className={styles.form}>
          <Input
            type="text"
            placeholder="Insira seu E-mail"
            size="lg"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <Input
            type="password"
            placeholder="Sua senha"
            size="lg"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </form>
        <div className={styles.divButtons}>
          <div className={styles.inlineButtons}>
            <div
              className={styles.googleButton}
              onClick={() => signInWithGoogle()}
            >
              <img src={googleIcon} />
              <p className={styles.responsiveGoogleButtonText}>Login</p>
            </div>
            <div className={styles.verticalLine}></div>
            <Button
              onClick={() => trySignIn()}
              type="default"
              width="150px"
              height="40px"
              shadow="2px 6px 4px rgba(0, 0, 0, 0.25)"
            >
              Login
            </Button>
          </div>
          <Link className={styles.linkText} to="/SignUp">
            <i className={styles.linkText}>Não tem uma conta? Crie Aqui!</i>
          </Link>
        </div>
      </div>
      <img src={RightWave} className={styles.wave} width="100vh" />
      <div className={styles.bodyRightSide}>
        <img src={AbacateAlongamento} width="50%" />
      </div>
    </div>
  );
};

export default SignIn;
