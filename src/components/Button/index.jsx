import { Link } from "react-router-dom";

import style from "./index.module.css";

export default function Button({
  className = "",
  callback,
  to,
  children,
  type = "",
}) {
  return to === undefined ? (
    <button
      onClick={callback}
      type={type}
      className={`${style.button} ${className}`}
    >
      {children}
    </button>
  ) : (
    <Link to={to} className={`${style.button} ${className}`}>
      {children}
    </Link>
  );
}
