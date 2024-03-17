import React from "react";
import "./NavIcon-style.css";
import { Link } from "react-router-dom";

function NavIcon({ iconClass, page, onClick }) {
  return (
    <Link
      to={`/${page}`}
      onClick={() => {
        onClick();
      }}
    >
      <i className={iconClass}></i>
    </Link>
  );
}

export default NavIcon;
