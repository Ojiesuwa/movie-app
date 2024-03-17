import React, { useState } from "react";
import "./Navbar-style.css";
import NavIcon from "../components/NavIcon";

function Navbar({ currentNav, setCurrentNav, visible }) {
  return (
    <div className={`nav-bar ${visible ? "shown" : "shown"}`}>
      <NavIcon
        onClick={() => {
          setCurrentNav(0);
        }}
        iconClass={`fa-solid fa-home ${currentNav === 0 ? "" : "inactive"}`}
        page=""
      />
      <NavIcon
        onClick={() => {
          setCurrentNav(1);
        }}
        iconClass={`fa-solid fa-search ${currentNav === 1 ? "" : "inactive"}`}
        page="Search"
      />
      <NavIcon
        onClick={() => {
          setCurrentNav(2);
        }}
        iconClass={`fa-regular fa-heart ${currentNav === 2 ? "" : "inactive"}`}
        page="Saved"
      />
      <NavIcon
        onClick={() => {
          setCurrentNav(3);
        }}
        iconClass={`fa-solid fa-user ${currentNav === 3 ? "" : "inactive"}`}
        page="Account"
      />
    </div>
  );
}

export default Navbar;
