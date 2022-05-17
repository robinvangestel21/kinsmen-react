import styles from "./kinsmen-video.module.css";
import { useState, useEffect } from "react";
import Player from "@vimeo/player";
import PlayerButton from "../player-button/player-button";

const KinsmenVideo = ({ src, img, width, height, id }) => {
  const [player, setPlayer] = useState(null);
  const [playing, setPlaying] = useState(false);

  function handleClick() {
    player.play();
    setPlaying(true);
  }

  useEffect(() => {
    setPlayer(
      new Player(`id${id}`, {
        id: { id },
        width: "200px",
        controls: false,
      })
    );
  }, [src]);

  return (
    <div
      className={styles.videoContainer}
      style={{ width: width, height: height }}
    >
      <iframe
        title={src}
        src={src}
        id={`id${id}`}
        allow="autoplay"
        width={"100%"}
        height={"100%"}
      ></iframe>
      {!playing && (
        <div className={styles.videoOverlayContainer} onClick={handleClick}>
          {img !== "" && <img src={img} alt="Thumbnail" />}
          <div className={styles.videoOverlay}></div>
          <PlayerButton className={styles.videoOverlayPlayButton} />
        </div>
      )}
    </div>
  );
};

export default KinsmenVideo;
