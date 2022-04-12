import "./Navbar.css";
import Logo from "./../../images/NemesisV1.1.png";
import Button from "./../Button/Button";
import menuIcon from "./../../images/menuIcon.png";

const Navbar = () => {
  var isShowed = false;

  const showResponsiveMenu = () => {
    if (!isShowed) {
      document.getElementById("responsive-menu").style.visibility = "visible";
      document.getElementById("responsive-menu").style.opacity = "100%";
      document.getElementById("responsive-menu").style.height = "100px";
      document.getElementById("navbar-body").style.boxShadow =
        "0px 3px 3px rgba(0, 0, 0, 0.25)";
      isShowed = true;
    } else {
      document.getElementById("responsive-menu").style.visibility = "hidden";
      document.getElementById("responsive-menu").style.opacity = "0%";
      document.getElementById("responsive-menu").style.height = "0px";
      document.getElementById("navbar-body").style.boxShadow = "none";
      isShowed = false;
    }
  };

  return (
    <div className="navbar-body" id="navbar-body">
      <div className="navbar-flex">
        <div className="navbar-left-side">
          <img src={Logo} height="65px" alt="" />
        </div>
        <div className="navbar-right-side">
          <Button text="Cadastre-se" background="#45c4b0" color="white" />
          <a href="">Fazer Login</a>
        </div>

        <div className="navbar-right-side-responsive">
          <img onClick={showResponsiveMenu} src={menuIcon} alt="" />
        </div>
      </div>

      <div id="responsive-menu" className="responsive-menu">
        <Button
          className="button-menu-responsive"
          text="Cadastre-se"
          background="#45c4b0"
          color="white"
        />
        <Button
          className="button-menu-responsive"
          text="Fazer Login"
          background="#9AEBA3"
          color="white"
        />
      </div>
    </div>
  );
};

export default Navbar;
