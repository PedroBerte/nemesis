import "./Button.css";

const Button = ({ text, background, color, height, width }) => {
  return (
    <div
      style={{
        width: width,
        backgroundColor: background,
        color: color,
        height: height,
      }}
      className="button-body"
    >
      <p>{text}</p>
    </div>
  );
};

export default Button;
