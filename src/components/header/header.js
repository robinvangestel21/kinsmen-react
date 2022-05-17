import Logo from "../logo/logo";
import styles from "./header.module.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../appContext";
import HamburgerButton from "../hamburger-button/hamburger-button";
import { useWindowSize } from "../../hooks/useWindowSize";

const Header = () => {
  const { translations, locale, setLocale, screenMoved, moveScreen } =
    useContext(AppContext);
  const content = translations.general.header;
  const size = useWindowSize();

  return (
    <nav className={styles.header}>
      <a href={"../"}>
        <Logo className={styles.headerLogo} />
      </a>
      {size.width < 830 ? (
        <HamburgerButton screenMoved={screenMoved} moveScreen={moveScreen} />
      ) : (
        <div className={styles.container}>
          <ul className={styles.navigation}>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.headerLink} ${styles.active}`
                    : styles.headerLink
                }
                to="/work"
              >
                {content.work}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.headerLink} ${styles.active}`
                    : styles.headerLink
                }
                to="/about"
              >
                {content.about}
              </NavLink>
            </li>
            <li>
              <a
                className={styles.headerLink}
                href="https://www.anymigo.tv"
                target={"_blank"}
                rel={"noreferrer"}
              >
                {content.anymigo}
              </a>
            </li>
          </ul>
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
      )}
    </nav>
  );
};

export default Header;
