import React from "react";
import Logo from "./../../images/NemesisV1.1.png";
import "./Login.css";
import AbacateAlongamento from "./../../images/AbacateAlongamento1.png";
import RightWave from "./../../images/wave-right.png";
import Button from "./../../components/Button/Button";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";

const Login = () => {
  return (
    <div className="login-body">
      <div className="login-left-side">
        <Link to="/">
          <img className="login-logo" width="230px" src={Logo} alt="" />
        </Link>
        <form action="" className="login-form">
          <Input
            type="text"
            placeholder="Insira seu E-mail"
            size="lg"
            onChange={(event) => {
              console.log(event.target.value);
            }}
          />
          <Input
            type="password"
            placeholder="Sua senha"
            size="lg"
            onChange={(event) => {
              console.log(event.target.value);
            }}
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
        </form>
        <Link to="/Register">
          <a>
            <i className="link-text">Não tem uma conta? Crie Aqui!</i>
          </a>
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
