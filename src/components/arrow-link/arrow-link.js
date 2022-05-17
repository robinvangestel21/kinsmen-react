import { Link } from "react-router-dom";
import styles from "./arrow-link.module.css";
import Arrow from "../arrow/arrow";

const ArrowLink = ({ children, href, isLarge, inverse }) => {
  return (
    <Link to={href}>
      <div
        className={`${styles.link} ${
          isLarge ? styles.largeLink : styles.smallLink
        } ${inverse ? styles.inverseLink : styles.regularLink}`}
      >
        {children}
        <Arrow />
      </div>
    </Link>
  );
};

export default ArrowLink;
