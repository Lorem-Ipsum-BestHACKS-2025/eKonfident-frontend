import { MdOutlineAddComment } from "react-icons/md";
import { Link } from "react-router-dom";

import style from "./index.module.css";

export default function CommentButton({ id }) {
  return (
    <Link to={`/reports/${id}`} className={style.button}>
      <MdOutlineAddComment /> <span>Skomentuj</span>
    </Link>
  );
}
