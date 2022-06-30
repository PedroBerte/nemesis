import React from "react";
import Button from "../../components/Button/Button";
import LineSpace from "../../components/LineSpace/LineSpace";

import Navbar from "../../components/Navbar/Navbar";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

import Men from "./../../images/men.png";

import "./UserPage.css";

export default function UserPage() {
  return (
    <>
      <Navbar />
      <h2 className="user-page-title">Perfil do usuário:</h2>
      <div className="div-specs-gym">
        <div className="div-specs">
          <h3 className="user-page-subtitle">Suas medidas:</h3>
          <div className="user-page-specs-left-side">
            <img width="100px" src={Men} alt="" />
            <div>
              <div className="user-page-progress">
                <p>Idade: </p>
                <ProgressBar width="200px" value="50" color="red" />
              </div>
              <div>
                <p>Altura: </p>
                <ProgressBar width="200px" value="50" color="red" />
              </div>
              <div>
                <p>Peso: </p>
                <ProgressBar width="200px" value="50" color="red" />
              </div>
              <Button type="default">Atualizar Medidas</Button>
            </div>
          </div>
          <div>
            <div>
              <h3>Rotina de treinos:</h3>
              <Button type="default">Alterar</Button>
            </div>
          </div>
        </div>
        <div className="div-workouts"></div>
      </div>
    </>
  );
}
