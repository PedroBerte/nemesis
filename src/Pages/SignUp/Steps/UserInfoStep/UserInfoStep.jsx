import React, { useState } from "react";
import styles from "./UserInfoStep.module.css";

import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import { useSignUp } from "../../../../contexts/SignUpContext";

export default function UserInfoStep({ tryRegisterUser }) {
  const {
    setRegisterBornDate,
    setRegisterSex,
    setRegisterHeight,
    setRegisterWeight,
    setRegisterGoal,
    gymAvailability,
    setGymAvailability,
    gymDays,
    setGymDays,
    setUserRes,
    gymFreq,
    setGymFreq,
  } = useSignUp();

  function setLabelPosition() {
    if (inputValue == 1) {
      return "0%";
    } else if (inputValue == 2) {
      return "25%";
    } else if (inputValue == 3) {
      return "50%";
    } else {
      return "100%";
    }
  }

  return (
    <>
      <div className={styles.body}>
        <div className={styles.leftSide}>
          <Input
            type="date"
            size="md"
            placeholder="Data de Nascimento"
            onChange={(event) => {
              setRegisterBornDate(event.target.value);
            }}
            min="1942-01-01"
          />
          <div className={styles.inlineResponsive}>
            <select
              className={styles.select}
              onChange={(event) => {
                setRegisterSex(event.target.value);
              }}
              id={styles.selectSex}
            >
              <option value="" selected disabled hidden>
                Sexo
              </option>
              <option value="M">Masculino</option>
              <option value="N">Feminino</option>
            </select>
            <Input
              type="number"
              size="md"
              placeholder="Peso (Kg)"
              onChange={(event) => {
                setRegisterWeight(event.target.value);
              }}
              id={styles.selectWeight}
            />
            <Input
              type="number"
              size="md"
              placeholder="Altura"
              onChange={(event) => {
                setRegisterHeight(event.target.value);
              }}
              id={styles.selectHeight}
            />
          </div>
        </div>
        <div className={styles.rightSide}>
          <select
            className={styles.select}
            onChange={(event) => {
              setRegisterGoal(event.target.value);
            }}
          >
            <option value="" selected disabled hidden>
              Objetivo
            </option>
            <option value="P">Perda de Peso</option>
            <option value="G">Ganho de Massa</option>
          </select>
          <select
            className={styles.select}
            onChange={(event) => {
              setGymAvailability(event.target.value);
            }}
          >
            <option value="" selected disabled hidden>
              Teria uma academia disponível?
            </option>
            <option value="GYM-S">Sim</option>
            <option value="GYM-N">Não</option>
          </select>
          <select
            className={styles.select}
            onChange={(event) => {
              setGymFreq(event.target.value);
            }}
          >
            <option value="" selected disabled hidden>
              Já frequentou uma academia?
            </option>
            <option value="GYM-FREQ-S">Sim</option>
            <option value="GYM-FREQ-N">Não</option>
          </select>
          <select
            className={styles.select}
            onChange={(event) => {
              setUserRes(event.target.value);
            }}
          >
            <option value="" selected disabled hidden>
              Alguma Restrição alimentar?
            </option>
            <option value="RES-N">Sem restrição</option>
            <option value="RES-LAC">Intolerancia à Lactose</option>
            <option value="RES-GLU">Restrição de Glúten</option>
          </select>
        </div>
      </div>
      <div className={styles.availGymDaysBody}>
        <div className={styles.texts}>
          <p className={styles.text}>Dias disponíveis para treino:</p>
          <p className={styles.value}>
            {gymDays == "" ? (
              <></>
            ) : (
              <>
                {gymDays == 1
                  ? `${gymDays.replace("GYM-DAYS-", "")} dia`
                  : `${gymDays.replace("GYM-DAYS-", "")} dias`}
              </>
            )}
          </p>
        </div>
        <input
          type="range"
          className={styles.inputRange}
          onChange={(e) => setGymDays(`GYM-DAYS-${e.target.value}`)}
          min="3"
          max="6"
          defaultValue={3}
        />
      </div>
      <div className={styles.rightDiv}>
        <Button
          type="default"
          onClick={() => tryRegisterUser()}
          color="white"
          height="40px"
          shadow="2px 6px 4px rgba(0, 0, 0, 0.25)"
        >
          Cadastre-se
        </Button>
      </div>
    </>
  );
}
