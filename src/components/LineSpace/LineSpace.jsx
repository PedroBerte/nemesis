import "./LineSpace.css";

const LineSpace = ({ width, margin }) => {
  return (
    <div
      className="lineSpace-body"
      style={{ width: width, marginTop: margin, marginBottom: margin }}
    ></div>
  );
};

export default LineSpace;
