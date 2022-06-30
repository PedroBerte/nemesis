import React from "react";

import Navbar from "../../components/Navbar/Navbar";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

import Men from "./../../images/men.png";

export default function UserPage() {
  return (
    <>
      <Navbar />
      <h2 className="user-page-title">Perfil do usuário:</h2>
      <div className="div-specs-gym">
        <div className="div-specs">
          <h3 className="">Suas medidas:</h3>
          <div>
            <img width="100px" src={Men} alt="" />
            <div>
              <div>
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
            </div>
          </div>
        </div>
        <div className="div-workouts"></div>
      </div>
    </>
  );
}
