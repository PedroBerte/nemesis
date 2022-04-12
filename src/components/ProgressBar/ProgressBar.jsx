import "./ProgressBar.css";

const ProgressBar = ({ color, value, width }) => {
  var progress = `${value}%`;

  return (
    <div style={{ width: width }} className="progress-body">
      <div
        style={{ backgroundColor: color, width: progress }}
        className="progress-colored"
      ></div>
    </div>
  );
};

export default ProgressBar;
