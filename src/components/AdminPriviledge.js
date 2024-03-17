import React from "react";
import "./AdminPriviledge-style.css";
import { generateRandomColor } from "../aiders/RandomColor";

function AdminPriviledge({ iconClass, label, action }) {
  const colorgen = generateRandomColor();

  const style = {
    borderColor: colorgen,
  };
  const iconStyle = {
    color: colorgen,
  };
  return (
    <div className="admin-priviledge anim-fade" style={style} onClick={action}>
      <i className={iconClass} style={iconStyle}></i>
      <p>{label}</p>
    </div>
  );
}

export default AdminPriviledge;
