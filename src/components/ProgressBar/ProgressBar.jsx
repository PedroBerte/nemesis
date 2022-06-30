import styles from "./ProgressBar.module.css";

const ProgressBar = ({ color, value, width }) => {
  var progress = `${value}%`;

  return (
    <div style={{ width: width }} className={styles.progressBody}>
      <div
        style={{ backgroundColor: color, width: progress }}
        className={styles.progressColored}
      ></div>
    </div>
  );
};

export default ProgressBar;
