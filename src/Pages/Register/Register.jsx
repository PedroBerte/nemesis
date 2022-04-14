import "./Register.css";
import AbacateAlongamento from "./../../images/AbacateAlongamento1.png";
import Logo from "./../../images/NemesisV1.1.png";
import LeftWave from "./../../images/wave-left.png";
import Button from "./../../components/Button/Button";
import { Link } from "react-router-dom";

const RegisterUser = () => {};

const Register = () => {
  return (
    <div className="register-body">
      <div className="register-left-side">
        <img src={AbacateAlongamento} alt="" />
      </div>
      <img src={LeftWave} alt="" />
      <div className="register-right-side">
        <div style={{ width: "100%" }}>
          <Link to="/">
            <img className="register-logo" src={Logo} width="200px" alt="" />
          </Link>
        </div>
        <form className="register-form" autocomplete="off">
          <div className="register-email-side">
            <input
              type="text"
              className="input lg"
              placeholder="Nome Completo"
            />
            <input
              type="email"
              className="input lg"
              placeholder="Insira seu E-mail"
            />
            <input
              type="email"
              className="input lg"
              placeholder="Confirme seu E-mail"
            />
            <input
              type="password"
              className="input lg"
              placeholder="Sua Senha"
            />
            <input
              type="password"
              className="input lg"
              placeholder="Confirme a sua Senha"
            />
          </div>
          <div className="register-info-side">
            <input
              type="date"
              className="input sm"
              placeholder="Data de Nascimento"
            />
            <select className="select sm">
              <option value="M">Masculino</option>
              <option value="N">Feminino</option>
              <option value="NA">Prefiro não Informar</option>
            </select>
            <input type="number" className="input sm" placeholder="Peso" />
            <input type="number" className="input sm" placeholder="Altura" />
            <select className="select sm">
              <option value="P">Perda de Peso</option>
              <option value="G">Ganho de Massa</option>
              <option value="FR">Força e Resistencia</option>
            </select>
          </div>
        </form>
        <Button
          text="Cadastre-se"
          background="#45c4b0"
          color="white"
          height="40px"
          shadow="2px 6px 4px rgba(0, 0, 0, 0.25)"
        />
        <Link to="/Login">
          <a>
            <i>Já tem uma conta? Clique Aqui!</i>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Register;
