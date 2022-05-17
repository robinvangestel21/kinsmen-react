import { useParams } from "react-router-dom";
import styles from "./project.module.css";
import { useRef, useState, useEffect, useContext } from "react";
import KinsmenVideo from "../../components/kinsmen-video/kinsmen-video";
import AppContext from "../../appContext";
import Chevron from "../../components/chevron/chevron";
import ArrowLink from "../../components/arrow-link/arrow-link";
import { useWindowSize } from "../../hooks/useWindowSize";
import PlaceholderImage from "../../components/placeholder-content/placeholder-image";

export default function Project() {
  const { contentfulClient, translations, locale } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  let containerRef = useRef(null);
  let { projectSlug } = useParams();
  const [project, setProject] = useState({});
  const [nextProjectSlug, setNextProjectSlug] = useState("");
  const [previousProjectSlug, setPreviousProjectSlug] = useState("");

  function getEntries(properties) {
    return contentfulClient.getEntries({
      locale: locale,
      content_type: "project",
      ...properties,
    });
  }
  async function fetchData() {
    let responseCurrent = await getEntries({ "fields.slug": projectSlug });
    let currentProject = responseCurrent.items.map((project) => {
      return {
        ...project.fields,
        thumbnailUrl: project.fields.thumbnail.fields.file.url,
      };
    })[0];

    let responseNext = await getEntries({
      "fields.order": currentProject.order + 1,
    });
    let responsePrevious = await getEntries({
      "fields.order": currentProject.order - 1,
    });

    setProject(currentProject);
    setNextProjectSlug(
      responseNext.items.length > 0 && responseNext.items[0].fields.slug
    );
    setPreviousProjectSlug(
      responsePrevious.items.length > 0 && responsePrevious.items[0].fields.slug
    );
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [useParams()]);

  let {
    projectTitle,
    client,
    thumbnailUrl,
    vimeoNumber,
    longDescription,
    contentBlock1,
    contentBlock2,
    contentBlock3,
    contentBlock4,
    contentBlock5,
    contentBlock6,
    contentBlock7,
    contentBlock8,
    contentBlock9,
    contentBlock10,
  } = project;
  let contentBlocks = [
    contentBlock1,
    contentBlock2,
    contentBlock3,
    contentBlock4,
    contentBlock5,
    contentBlock6,
    contentBlock7,
    contentBlock8,
    contentBlock9,
    contentBlock10,
  ]
    .filter((block) => block !== undefined)
    .map((block) =>
      block.map((object) => {
        return {
          vimeoNumber: object.fields.title,
          url: "https:" + object.fields.file.url,
          type: object.fields.file.contentType,
        };
      })
    );
  const windowWidth = useWindowSize().width;
  const mobile = windowWidth <= 830;
  const largeScreen = windowWidth >= 1564;

  let containerWidth = containerRef.current
    ? containerRef.current.offsetWidth
    : 0;

  return loading ? (
    <PlaceholderImage />
  ) : (
    <div className={styles.container} ref={containerRef}>
      {vimeoNumber && thumbnailUrl ? (
        <KinsmenVideo
          width={
            mobile ? "90vw" : largeScreen ? "1500px" : "calc(100vw - 64px)"
          }
          height={
            mobile
              ? "50.625vw"
              : largeScreen
              ? "calc(1500px * 9/16)"
              : "calc((100vw - 64px) * 9/16)"
          }
          id={vimeoNumber}
          src={"https://player.vimeo.com/video/" + vimeoNumber}
          img={"https:" + thumbnailUrl}
        />
      ) : (
        <img src={"https:" + thumbnailUrl} alt="Video thumbnail" />
      )}
      <main>
        <h1>{projectTitle}</h1>
        <h2>{client}</h2>
        <p>{longDescription}</p>
        <Chevron className={styles.chevron} />
      </main>
      {contentBlocks.map((block) => (
        <div
          className={styles.contentRow}
          style={{
            margin: "20px 0",
            display: "flex",
            flexDirection: "row",
            gap: "20px",
          }}
        >
          {block.map((object) =>
            object.type !== "text/html" ? (
              <img
                style={{
                  width: `calc(100% / ${block.length} - 20px * ${
                    block.length - 1
                  }/ ${block.length})`,
                }}
                src={object.url}
                alt="project thumbnail"
              />
            ) : (
              <>
                <KinsmenVideo
                  src={"https://player.vimeo.com/video/" + object.vimeoNumber}
                  id={object.vimeoNumber}
                  img={""}
                  width={`calc(${containerWidth}px / ${block.length} - 20px * ${
                    block.length - 1
                  }/ ${block.length})`}
                  height={`calc((${containerWidth}px / ${
                    block.length
                  } - 20px * ${block.length - 1}/ ${block.length}) * 9/16)`}
                />
              </>
            )
          )}
        </div>
      ))}
      <div className={styles.buttonContainer}>
        {previousProjectSlug && (
          <ArrowLink href={"../" + previousProjectSlug} inverse isLarge>
            {translations.project.previousProject}
          </ArrowLink>
        )}
        {nextProjectSlug && (
          <ArrowLink href={"../" + nextProjectSlug} isLarge>
            {translations.project.nextProject}
          </ArrowLink>
        )}
      </div>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </div>
  );
}
