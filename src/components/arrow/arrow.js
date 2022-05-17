const Arrow = (props) => {
  const color = props.color || "#1a1a1a";

  return (
    <svg
      className={props.className}
      style={!props.className && { width: 20 }}
      data-name="project-arrow"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 29.62 16.16"
    >
      <line
        stroke={color}
        strokeMiterlimit={10}
        strokeWidth={2.8}
        y1="8.08"
        x2="26.66"
        y2="8.08"
      ></line>
      <polyline
        stroke={color}
        strokeMiterlimit={10}
        strokeWidth={2.8}
        fill="none"
        points="20.55 0.99 27.64 8.08 20.55 15.17"
      ></polyline>
    </svg>
  );
};

export default Arrow;
