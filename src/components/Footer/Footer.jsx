import React from "react";
import styles from "./Footer.module.css";

import Waves from "./../../images/waves.png";

export default function Footer() {
  return (
    <>
      <img src={Waves} width="100%" alt="" />
      <footer className={styles.footer}>
        <p>© Copyright 2022. Todos os direitos reservados.</p>
        <p>Feito por: Leonardo Luccarelli, Matheus Pereira e Pedro Bertelli</p>
      </footer>
    </>
  );
}
