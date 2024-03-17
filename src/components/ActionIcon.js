import React from "react";
import "./ActionIcon-style.css";

function ActionIcon({ iconClass, onClick }) {
  return (
    <div
      className="action-icon"
      onClick={() => {
        onClick();
      }}
    >
      <i className={iconClass}></i>
    </div>
  );
}

export default ActionIcon;
