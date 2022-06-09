import React, { useState, useContext } from "react";
import "./Login.css";

import Logo from "./../../images/NemesisV1.1.png";
import AbacateAlongamento from "./../../images/AbacateAlongamento1.png";
import RightWave from "./../../images/wave-right.png";
import Button from "./../../components/Button/Button";

import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/Input/Input";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../services/firebase-config";
import { collection, getDocs } from "firebase/firestore";

import { AuthContext } from "./../../contexts/AuthContext";

import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigateTo = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const userCollectionRef = collection(db, "users");

  function getException(message) {
    this.message = message;
  }

  function trySignIn() {
    toast.promise(signIn(), {
      loading: "Carregando...",
      success: "Logado!",
      error: (err) => err.message.toString(),
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

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <div className="login-body">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ style: { fontFamily: "Segoe UI" } }}
      />
      <div className="login-left-side">
        <Link to="/">
          <img className="login-logo" width="230px" src={Logo} alt="" />
        </Link>
        <form className="login-form">
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
        <Button
          onClick={() => trySignIn()}
          background="#45c4b0"
          color="white"
          width="150px"
          type="submit"
          height="40px"
          shadow="2px 6px 4px rgba(0, 0, 0, 0.25)"
        >
          Login
        </Button>
        <Link className="link-text" to="/Register">
          <i className="link-text">Não tem uma conta? Crie Aqui!</i>
        </Link>
      </div>
      <img src={RightWave} className="wave" width="100vh" alt="" />
      <div className="login-right-side">
        <img src={AbacateAlongamento} width="50%" />
      </div>
    </div>
  );
};

export default Login;
