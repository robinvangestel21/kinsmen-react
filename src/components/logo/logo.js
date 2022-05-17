const Logo = (props) => {
  const color = props.color || '#1a1a1a';
  return ( 
    <svg className={props.className} data-name="kinsmen-logo" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 51.27 50.56">
      <polygon fill={color}
        points="8.29 37.68 14.25 37.68 20.7 50.56 29.97 50.56 19.37 29.41 0 29.41 0 50.56 8.29 50.56 8.29 37.68" />
      <polygon fill={color}
        points="14.25 12.88 8.29 12.88 8.29 0 0 0 0 21.14 19.37 21.14 29.97 0 20.7 0 14.25 12.88" />
      <polygon fill={color}
        points="51.27 8.23 51.27 0 39.12 0 26.39 25.28 39.12 50.56 51.27 50.56 51.27 42.33 44.24 42.33 35.66 25.28 44.24 8.23 51.27 8.23" />
    </svg>
   );
}
 
export default Logo;