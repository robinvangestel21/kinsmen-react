import { useState, useContext } from "react";
import styles from "./filter.module.css";
import AppContext from "../../appContext";
import Chevron from "../chevron/chevron";

const Filter = ({ onClick }) => {
  let { translations } = useContext(AppContext);
  translations = translations.work.filter;

  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState("all");

  function toggleFilter() {
    setIsOpen(!isOpen);
  }

  const filters = [
    { title: translations.all, key: "all" },
    { title: translations.animation, key: "Animation" },
    { title: translations.illustration, key: "Illustration" },
    { title: translations.photography, key: "Photography" },
    { title: translations.video, key: "Video" },
  ];

  return (
    <div className={styles.container}>
      {isOpen &&
        filters.map((f) => (
          <button
            className={`${styles.fadeIn} ${f.key === current && styles.active}`}
            onClick={() => {
              onClick(f.key);
              setCurrent(f.key);
            }}
          >
            {f.title}
          </button>
        ))}
      <Chevron className={`${styles.chevron} ${isOpen && styles.rotated}`} />
      <button className={styles.active} onClick={toggleFilter}>
        {translations.filter}
      </button>
    </div>
  );
};

export default Filter;
