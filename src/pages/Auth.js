import React, { useEffect, useState } from "react";
import "./Auth-style.css";
import { logOutUser, loginUser } from "../database/clientstorage";
import { useNavigate } from "react-router-dom";
import { loginClient, signupClient } from "../database/backend";
import Loading from "../components/Loading";
import Message from "../components/Message";

function Auth({ setNavVisibility }) {
  const [auth, setAuth] = useState(true);
  const [authDetails, setAuthDetails] = useState({
    firstname: "",
    lastname: "",
    loginEmail: "",
    loginPassword: "",
    signupEmail: "",
    signupPassword: "",
  });
  const [loadingBar, setLoadingBar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setNavVisibility(false);
  }, []);

  return (
    <div className="cover">
      {loadingBar && (
        <Message
          iconClass={"fa-solid fa-spinner"}
          message={"Authenticating You, Wait a Minute"}
        />
      )}
      <div className={"auth"}>
        <div className={`login-box ${auth ? "shown-auth" : "hidden-auth"}`}>
          <h3 className="heading">Login</h3>
          <div className="inputs">
            <input
              type="text"
              placeholder="Enter Email Here..."
              value={authDetails.loginEmail}
              onChange={(e) => {
                setAuthDetails({ ...authDetails, loginEmail: e.target.value });
              }}
            ></input>
            <input
              type="text"
              placeholder="Enter Password Here..."
              value={authDetails.loginPassword}
              onChange={(e) => {
                setAuthDetails({
                  ...authDetails,
                  loginPassword: e.target.value,
                });
              }}
            ></input>
            <button
              className="auth-btn"
              onClick={() => {
                setLoadingBar(true);
                loginClient({
                  email: authDetails.loginEmail,
                  password: authDetails.loginPassword,
                }).then((response) => {
                  setLoadingBar(false);
                  if (response.type === "err") {
                    alert(response.content);
                  } else {
                    loginUser(response.content);
                    navigate("/");
                  }
                });
              }}
            >
              Login
            </button>
            <p
              className="change-auth"
              onClick={() => {
                setAuth(false);
              }}
            >
              No account yet, click to signup
            </p>
          </div>
        </div>
        <div className={`login-box ${!auth ? "shown-auth" : "hidden-auth"}`}>
          <h3 className="heading">Signup</h3>
          <div className="inputs">
            <input
              type="text"
              placeholder="Enter Firstname Here..."
              value={authDetails.firstname}
              onChange={(e) => {
                setAuthDetails({
                  ...authDetails,
                  firstname: e.target.value,
                });
              }}
            ></input>
            <input
              type="text"
              placeholder="Enter Lastname Here..."
              value={authDetails.lastname}
              onChange={(e) => {
                setAuthDetails({
                  ...authDetails,
                  lastname: e.target.value,
                });
              }}
            ></input>
            <input
              type="text"
              placeholder="Enter Email Here..."
              value={authDetails.signupEmail}
              onChange={(e) => {
                setAuthDetails({
                  ...authDetails,
                  signupEmail: e.target.value,
                });
              }}
            ></input>
            <input
              type="text"
              placeholder="Enter Password Here..."
              value={authDetails.signupPassword}
              onChange={(e) => {
                setAuthDetails({
                  ...authDetails,
                  signupPassword: e.target.value,
                });
              }}
            ></input>
            <button
              className="auth-btn"
              onClick={() => {
                setLoadingBar(true);
                if (
                  authDetails.firstname &&
                  authDetails.lastname &&
                  authDetails.signupPassword &&
                  authDetails.signupEmail
                ) {
                  signupClient({
                    Firstname: authDetails.firstname,
                    Lastname: authDetails.lastname,
                    Email: authDetails.signupEmail,
                    Password: authDetails.signupPassword,
                  }).then((userID) => {
                    setLoadingBar(false);
                    loginUser(userID);
                    navigate("/Account");
                  });
                  console.log(authDetails);
                } else {
                  alert("Fill all up all fields before signing is");
                }
              }}
            >
              Signup
            </button>
            <p
              className="change-auth"
              onClick={() => {
                setAuth(true);
              }}
            >
              Already have an account ? click to login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
