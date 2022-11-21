import styles from "./Button.module.css";

const Button = (props) => {
  var backColor;
  if (props.type == "default") {
    backColor = "#45c4b0";
  }
  if (props.type == "warning") {
    backColor = "#C44545";
  }
  return (
    <button
      {...props}
      style={{
        width: props.width,
        backgroundColor: backColor,
        color: "white",
        height: props.height,
        boxShadow: props.shadow,
      }}
      className={styles.buttonBody}
    >
      <p style={{ fontSize: "14px", fontWeight: "500" }}>{props.children}</p>
    </button>
  );
};

export default Button;
