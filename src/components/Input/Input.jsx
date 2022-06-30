import styles from "./Input.module.css";

const Input = (props) => {
  var align;
  var padding;
  const checkSize = () => {
    if (props.size == "lg") {
      padding = "10px";
      return "95%";
    }
    if (props.size == "md") {
      return "90%";
    }
    if (props.size == "sm") {
      align = "center";
      return "85%";
    }
  };
  return (
    <input
      className={styles.inputBody}
      {...props}
      style={{
        width: checkSize(),
        textAlign: align,
        paddingLeft: padding,
      }}
    />
  );
};

export default Input;
