import styles from "./LineSpace.module.css";

const LineSpace = ({ width, margin }) => {
  return (
    <div
      className={styles.lineSpaceBody}
      style={{ width: width, marginTop: margin, marginBottom: margin }}
    ></div>
  );
};

export default LineSpace;
