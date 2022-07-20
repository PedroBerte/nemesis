import React from "react";
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
    setGymDays,
    setUserRes,
  } = useSignUp();

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
              <option value="NA">Prefiro não Informar</option>
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
          {gymAvailability == "" ? (
            <select className={styles.select}>
              <option value="" selected disabled hidden>
                Dias disponíveis para treino:
              </option>
              <option value="" disabled>
                Selecione a disponíbilidade da academia primeiro!
              </option>
            </select>
          ) : (
            <>
              {gymAvailability == "GYM-S" ? (
                <select
                  className={styles.select}
                  onChange={(event) => {
                    setGymDays(event.target.value);
                  }}
                >
                  <option value="" selected disabled hidden>
                    Dias disponíveis para treino:
                  </option>
                  <option value="GYM-DAYS-3">3</option>
                  <option value="GYM-DAYS-4">4</option>
                  <option value="GYM-DAYS-5">5</option>
                  <option value="GYM-DAYS-6">6</option>
                </select>
              ) : (
                <select
                  className={styles.select}
                  onChange={(event) => {
                    setGymDays(event.target.value);
                  }}
                >
                  <option value="" selected disabled hidden>
                    Dias disponíveis para treino:
                  </option>
                  <option value="GYM-DAYS-3">3</option>
                </select>
              )}
            </>
          )}
          <select
            className={styles.select}
            onChange={(event) => {
              setUserRes(event.target.value);
            }}
          >
            <option value="" selected disabled hidden>
              Alguma Restrição alimentar?
            </option>
            <option value="RES-LAC">Intolerancia à Lactose</option>
            <option value="RES-GLU">Restrição de Glúten</option>
          </select>
        </div>
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
