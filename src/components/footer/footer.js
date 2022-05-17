import "./footer.css";
import Logo from "../logo/logo";
import AppContext from "../../appContext";
import { useContext } from "react";

function renderGridItems(translations) {
  let items = [
    {
      title: "Kinsmen Collective",
      rule1: "KVK: 70001693",
      rule2: translations.vat + ": NL858098878B01",
    },
    {
      title: translations.address,
      rule1: (
        <a
          href="https://www.google.com/maps/search/?api=1&query=Kinsmen+Collective"
          target="_blank"
          rel="noreferrer"
        >
          Veemarktkade 8<br></br>5222 AE, Den Bosch
        </a>
      ),
    },
    {
      title: "Contact",
      rule1: <a href="mailto:hello@kinsmen.tv">hello@kinsmen.tv</a>,
      rule2: "073-822 49 45",
    },
    {
      title: "Socials",
      rule1: (
        <a
          href="https://www.instagram.com/kinsmen.tv/"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
      ),
      rule2: (
        <a
          href="https://www.linkedin.com/company/kinsmencollective/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      ),
    },
  ];
  return items.map((item) => (
    <div key={item.title} className={"gridItem"}>
      <h2>{item.title}</h2>
      <p>{item.rule1}</p>
      <p>{item.rule2}</p>
    </div>
  ));
}

const Footer = ({ light }) => {
  const { translations } = useContext(AppContext);
  return (
    <div className={["footerContainer", light && "beigeBackground"].join(" ")}>
      <div className="footerHeader">
        <h1 className="footerTitle">{translations.general.footer.title}</h1>
        <Logo className="footerLogo" color={light ? "#1a1a1a" : "#ffffff"} />
      </div>

      <div className="footerGrid">
        {renderGridItems(translations.general.footer)}
      </div>

      <p className="footerCopyright">
        Copyright &copy; 2021 Kinsmen Collective
      </p>
    </div>
  );
};

export default Footer;
