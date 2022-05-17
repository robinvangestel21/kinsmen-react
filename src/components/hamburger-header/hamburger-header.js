import styles from "./hamburger-header.module.css";
import { Link } from "react-router-dom";
import AppContext from "../../appContext";
import { useContext } from "react";

const HamburgerHeader = () => {
  const { translations, locale, setLocale } = useContext(AppContext);
  const content = translations.general.header;

  return (
    <div className={styles.container}>
      <Link className={styles.link} to="/work">
        {content.work}
      </Link>
      <Link className={styles.link} to="/about">
        {content.about}
      </Link>
      <a
        className={styles.link}
        href="https://www.anymigo.tv"
        target={"_blank"}
        rel={"noreferrer"}
      >
        {content.anymigo}
      </a>

      <div className={styles.langButtonContainer}>
        <button
          className={locale === "nl" ? styles.active : ""}
          onClick={() => setLocale("nl")}
        >
          {content.nl}
        </button>
        <span></span>
        <button
          className={locale === "en-US" ? styles.active : ""}
          onClick={() => setLocale("en-US")}
        >
          {content.en}
        </button>
      </div>
    </div>
  );
};

export default HamburgerHeader;
