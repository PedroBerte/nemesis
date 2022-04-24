import "./Button.css";

const Button = (props) => {
  return (
    <button
      {...props}
      style={{
        width: props.width,
        backgroundColor: props.background,
        color: props.color,
        height: props.height,
        boxShadow: props.shadow,
      }}
      className="button-body"
    >
      <p>{props.children}</p>
    </button>
  );
};

export default Button;
