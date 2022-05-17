import AppContext from "../../appContext";
import Footer from "../footer/footer";
import HamburgerHeader from "../hamburger-header/hamburger-header";
import Header from "../header/header";
import styles from "./layout.module.css";
import { useContext } from "react";

const Layout = ({ children }) => {
  const { screenMoved } = useContext(AppContext);
  return (
    <>
      <HamburgerHeader />
      <div
        className={styles.wrapper}
        style={{ transform: `translateY(${screenMoved ? "210px" : "0"})` }}
      >
        <div className={styles.container}>
          <Header />
          <div className={styles.main}>{children}</div>
        </div>
      </div>
      <Footer />
      {/* light={asPath === "/about" && true}/> */}
    </>
  );
};

export default Layout;
