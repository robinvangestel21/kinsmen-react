import { useEffect, useState, useContext } from "react";
import AppContext from "../../appContext";
import FeaturedProjectCard from "../../components/featured-project-card/featured-project-card";
import ArrowLink from "../../components/arrow-link/arrow-link";
import styles from "./home.module.css";

export default function Home() {
  const { translations, locale, contentfulClient } = useContext(AppContext);

  const [projects, setProjects] = useState([]);

  async function fetchData() {
    let response = await contentfulClient.getEntries({
      content_type: "project",
      locale: locale,
    });
    response = response.items.map((project) => project.fields);
    response = response
      .sort((a, b) => (a.order < b.order ? 1 : b.order < a.order ? -1 : 0))
      .slice(0, 3);
    setProjects(response);
  }

  useEffect(() => {
    fetchData();
  }, [locale]);

  return (
    <div>
      <h1 className={styles.title}>{translations.home.title}</h1>
      <div className={styles.projectCardContainer}>
        {projects.map((project) => (
          <FeaturedProjectCard key={project.order} project={project} />
        ))}
      </div>
      <div className={styles.arrowLinkContainer}>
        <ArrowLink href={"/work"} isLarge>
          {translations.general.viewAllProjects}
        </ArrowLink>
      </div>
    </div>
  );
}
