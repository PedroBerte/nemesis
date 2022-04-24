import React from "react";
import Logo from "./../../images/NemesisV1.1.png";
import "./Login.css";
import AbacateAlongamento from "./../../images/AbacateAlongamento1.png";
import RightWave from "./../../images/wave-right.png";
import Button from "./../../components/Button/Button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-body">
      <div className="login-left-side">
        <Link to="/">
          <img className="login-logo" width="230px" src={Logo} alt="" />
        </Link>
        <input
          type="email"
          className="input lg mb"
          placeholder="Insira o seu E-mail"
          required
        />
        <input
          type="password"
          className="input lg mb"
          placeholder="Sua senha"
          required
          style={{ marginBottom: "25px" }}
        />
        <Button
          background="#45c4b0"
          color="white"
          width="150px"
          height="40px"
          shadow="2px 6px 4px rgba(0, 0, 0, 0.25)"
        >
          Login
        </Button>
        <Link to="/Register">
          <a>
            <i>Não tem uma conta? Crie Aqui!</i>
          </a>
        </Link>
      </div>
      <img src={RightWave} width="100vh" alt="" />
      <div className="login-right-side">
        <img src={AbacateAlongamento} alt="" />
      </div>
    </div>
  );
};

export default Login;
