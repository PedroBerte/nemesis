import AbacateAlongamento from "./../../images/AbacateAlongamento1.png";
import "./Register.css";
import Logo from "./../../images/NemesisV1.1.png";
import LeftWave from "./../../images/wave-left.png";

const Register = () => {
  return (
    <div className="register-body">
      <div className="left-side">
        <img src={AbacateAlongamento} alt="" />
      </div>
      <img src={LeftWave} alt="" />
      <div className="right-side">
        <img src={Logo} width="200px" alt="" />
        <input
          type="email"
          className="input-apresentation"
          placeholder="Insira seu E-mail"
        />
      </div>
    </div>
  );
};

export default Register;
