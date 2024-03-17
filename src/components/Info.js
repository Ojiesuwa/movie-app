import React from "react";
import "./Info-style.css";

function Info({ title, value }) {
  return (
    <div className="info">
      <p className="tit">{title}:</p>
      <p className="val">{value}</p>
    </div>
  );
}

export default Info;
