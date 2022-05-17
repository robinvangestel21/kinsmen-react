import styles from "./project-card.module.css";
import KinsmenImage from "../kinsmen-image/kinsmen-image";
import { useWindowSize } from "../../hooks/useWindowSize";

const ProjectCard = ({ project, width }) => {
  const {
    slug,
    projectTitle,
    client,
    imageWidth100,
    imageWidth80,
    imageWidth67,
    imageWidth50,
    imageWidth33,
    imageWidth20,
  } = project;
  let image;
  switch (width) {
    case 100:
      image = imageWidth100;
      break;
    case 67:
      image = imageWidth67;
      break;
    case 33:
      image = imageWidth33;
      break;
    case 50:
      image = imageWidth50;
      break;
    case 20:
      image = imageWidth20;
      break;
    case 80:
      image = imageWidth80;
      break;
    default:
      image = imageWidth100;
      break;
  }

  const mobile = useWindowSize().width <= 830;
  return (
    <KinsmenImage
      overlayText={
        <div>
          <h1 className={styles.title}>{projectTitle}</h1>
          <h2 className={styles.subtitle}>{client}</h2>
        </div>
      }
      href={"../project/" + slug}
      src={
        mobile
          ? "https:" + imageWidth50.fields.file.url
          : "https:" + image.fields.file.url
      }
    />
  );
};

export default ProjectCard;
