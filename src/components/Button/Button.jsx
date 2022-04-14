import "./Button.css";

const Button = ({ text, background, color, height, width, shadow }) => {
  return (
    <div
      style={{
        width: width,
        backgroundColor: background,
        color: color,
        height: height,
        boxShadow: shadow,
      }}
      className="button-body"
    >
      <p>{text}</p>
    </div>
  );
};

export default Button;
