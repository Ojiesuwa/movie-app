import React from "react";
import "./Loading-style.css";

function Message({ message, iconClass }) {
  return (
    <div className="loading">
      <i className={iconClass}></i>
      <p>{message}</p>
    </div>
  );
}

export default Message;
