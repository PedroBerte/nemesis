import React from "react";
import styles from "./EmailStep.module.css";

import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import { useSignUp } from "../../../../contexts/SignUpContext";

import googleIcon from "../../../../images/googleIcon.png";

import { Link } from "react-router-dom";

export default function EmailStep({ tryRegisterUser, loginWithGoogle }) {
  const {
    registerName,
    setRegisterName,
    registerEmail,
    setRegisterEmail,
    registerConfirmEmail,
    setRegisterConfirmEmail,
    registerPassword,
    setRegisterPassword,
    registerConfirmPassword,
    setRegisterConfirmPassword,
  } = useSignUp();

  return (
    <>
      <form className={styles.form}>
        <div className={styles.emailSide} id={styles.emailSide}>
          <Input
            type="text"
            size="lg"
            value={registerName}
            placeholder="Nome Completo"
            onChange={(event) => {
              setRegisterName(event.target.value);
            }}
          />
          <Input
            type="email"
            size="lg"
            value={registerEmail}
            placeholder="Insira seu E-mail"
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <Input
            type="email"
            size="lg"
            value={registerConfirmEmail}
            placeholder="Confirme seu E-mail"
            onChange={(event) => {
              setRegisterConfirmEmail(event.target.value);
            }}
          />
          <Input
            type="password"
            size="lg"
            value={registerPassword}
            placeholder="Sua Senha"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
          <Input
            type="password"
            size="lg"
            value={registerConfirmPassword}
            placeholder="Confirme a sua Senha"
            onChange={(event) => {
              setRegisterConfirmPassword(event.target.value);
            }}
          />
        </div>
      </form>
      <div className={styles.divButtons}>
        <div className={styles.inlineButtons}>
          <div
            className={styles.googleButton}
            onClick={() => loginWithGoogle()}
          >
            <img src={googleIcon} />
            <p className={styles.responsiveGoogleButtonText}>Login</p>
          </div>
          <div className={styles.verticalLine}></div>
          <Button
            type="default"
            onClick={() => tryRegisterUser(window.screen.width)}
            color="white"
            height="50px"
            shadow="2px 6px 4px rgba(0, 0, 0, 0.25)"
          >
            Cadastre-se
          </Button>
        </div>
        <Link className={styles.linkText} to="/SignIn">
          <i className={styles.linkText}>Já tem uma conta? Clique Aqui!</i>
        </Link>
      </div>
    </>
  );
}
