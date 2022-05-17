import styles from "./hamburger-button.module.css";

const HamburgerButton = ({ moveScreen, screenMoved }) => {
  return (
    <button onClick={moveScreen}>
      <svg
        className={styles.hamburgerButton}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          className={`${styles.line} ${
            screenMoved ? styles.topLineActive : styles.topLine
          }`}
          x1="3"
          y1="3"
          x2="97"
          y2="3"
          stroke="black"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          className={`${styles.line} ${screenMoved ? styles.middleLine : ""}`}
          x1="3"
          y1="50"
          x2="97"
          y2="50"
          stroke="black"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          className={`${styles.line} ${
            screenMoved ? styles.bottomLineActive : styles.bottomLine
          }`}
          x1={screenMoved ? "3" : "25"}
          y1="97"
          x2="97"
          y2="97"
          stroke="black"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default HamburgerButton;
