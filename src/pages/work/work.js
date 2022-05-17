import styles from "./work.module.css";
import { createClient } from "contentful";
import { useState, useEffect, useContext } from "react";
import ProjectCard from "../../components/project-card/project-card";
import Filter from "../../components/filter/filter";
import AppContext from "../../appContext";
import { useWindowSize } from "../../hooks/useWindowSize";

function sort(list) {
  return list.sort((a, b) =>
    a.order < b.order ? 1 : b.order < a.order ? -1 : 0
  );
}

export default function Work() {
  const { contentfulClient, locale } = useContext(AppContext);

  const [projects, setProjects] = useState([]);
  const [viewableProjects, setViewableProjects] = useState([]);
  const [category, setCategory] = useState("all");

  async function fetchData() {
    let response = await contentfulClient.getEntries({
      content_type: "project",
      locale: locale,
    });
    response = response.items.map((project) => project.fields);
    response = sort(response);
    setProjects(response);
    setViewableProjects(response);
  }

  async function viewCategory(category) {
    new Promise((resolve) => {
      resolve(setViewableProjects([]));
    }).then(() => {
      setCategory(category);
      if (category === "all") {
        setViewableProjects(sort(projects));
      } else {
        let projectsInCategory = projects.filter((project) =>
          project.categories.includes(category)
        );
        setViewableProjects(sort(projectsInCategory));
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, [locale]);

  function getWidth(index, maxLength) {
    const reducedIndex = index % 12 === 0 ? 12 : index % 12;
    if (index === maxLength) {
      switch (reducedIndex) {
        case 3:
        case 7:
          return 33;
        case 5:
        case 12:
          return 50;
        case 10:
          return 80;
        default:
          return 100;
      }
    } else {
      switch (reducedIndex) {
        case 1:
        case 8:
          return 100;
        case 2:
        case 6:
          return 67;
        case 3:
        case 7:
          return 33;
        case 9:
          return 20;
        case 10:
          return 80;
        default:
          return 50;
      }
    }
  }
  const mobile = useWindowSize().width <= 830;
  return (
    <>
      <Filter onClick={viewCategory} />
      <div className={styles.workGrid}>
        {viewableProjects.map((project, index) => {
          let width = getWidth(index + 1, viewableProjects.length);
          return (
            <div
              key={project.order}
              style={{
                width: mobile
                  ? 100 + "%"
                  : width === 100
                  ? 100 + "%"
                  : `calc(${width}% - 8px)`,
              }}
              className={styles.isAnimated}
            >
              <ProjectCard width={width} project={project} />
            </div>
          );
        })}
      </div>
    </>
  );
}
