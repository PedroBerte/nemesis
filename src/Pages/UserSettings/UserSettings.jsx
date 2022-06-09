import React from "react";
import LineSpace from "../../components/LineSpace/LineSpace";
import Navbar from "../../components/Navbar/Navbar";
import "./UserSettings.css";

const UserSettings = () => {
  return (
    <>
      <Navbar />
      <p className="subtitle">Configurações da sua Conta:</p>
      <div className="userSettings-body">
        <div className="user-card-body">
          <img src="" alt="UserPhoto" />
          <div className="user-card-texts">
            <p className="user-card-name"></p>
            <p className="user-card-goal"></p>
          </div>
        </div>
        <LineSpace width="300px" margin="1.5rem" />
      </div>
    </>
  );
};

export default UserSettings;
