import styles from "./kinsmen-image.module.css";
import { Link } from "react-router-dom";

const KinsmenImage = (props) => {
  return (
    <Link to={props.href}>
      <div className={styles.container}>
        <img src={props.src} alt="alt"></img>
        <div className={styles.overlay}>
          <span className={styles.overlayText}>
            {props.overlayText ? props.overlayText : "BEKIJK PROJECT"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default KinsmenImage;
