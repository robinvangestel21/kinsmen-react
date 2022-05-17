import styles from "./featured-project-card.module.css";
import KinsmenImage from "../kinsmen-image/kinsmen-image";
import { useWindowSize } from "../../hooks/useWindowSize";
import ArrowLink from "../arrow-link/arrow-link";
import { useContext } from "react";
import AppContext from "../../appContext";

const FeaturedProjectCard = (props) => {
  const { translations } = useContext(AppContext);
  const {
    projectTitle,
    slug,
    imageWidth100,
    imageWidth33,
    client,
    shortDescription,
  } = props.project;
  const href = "../project/" + slug;
  const mobile = useWindowSize().width <= 830;
  return (
    <div className={styles.fpCardContainer}>
      <KinsmenImage
        href={href}
        src={
          mobile
            ? "https:" + imageWidth33.fields.file.url
            : "https:" + imageWidth100.fields.file.url
        }
      />
      <div className={styles.columnContainer}>
        <div>
          <h2 className={styles.title}>{projectTitle}</h2>
          <p className={styles.client}>{client}</p>
        </div>
        <div className={styles.column67}>
          <p className={styles.description}>{shortDescription}</p>
          <ArrowLink href={href}>{translations.general.viewProject}</ArrowLink>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjectCard;
