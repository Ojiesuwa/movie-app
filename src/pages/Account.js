import React, { useEffect, useState } from "react";
import "./Account-style.css";
import { useNavigate } from "react-router-dom";
import { getUserId, logOutUser, verifyAuth } from "../database/clientstorage";
import {
  fetchUserCredential,
  updateUser,
  uploadProfileImage,
  verifyAdmin,
} from "../database/backend";
import ModalNotification from "../parent-components/ModalNotification";

import Loading from "../components/Loading";

function Account({ setCurrentNav, setNavVisibility }) {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState();
  const [profileImageURL, setProfileImageURL] = useState(
    "https://th.bing.com/th/id/R.8352bbd0fdfbbbf44b80641ee088b945?rik=GCbhy4XnhNl7yQ&pid=ImgRaw&r=0"
  );
  const [profileImage, setProfileImage] = useState();
  const [email, setEmail] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [address, setAddress] = useState();
  const [phonenumber, setPhonenumber] = useState();
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    async function start() {
      let userData = await fetchUserCredential(getUserId() || "user");
      const {
        ProfileImage,
        Email,
        Firstname,
        Lastname,
        Address,
        Phonenumber,
        Date,
      } = userData || {};
      setProfileImageURL(
        ProfileImage ||
          "https://th.bing.com/th/id/R.8352bbd0fdfbbbf44b80641ee088b945?rik=GCbhy4XnhNl7yQ&pid=ImgRaw&r=0"
      );
      setEmail(Email);
      setFirstname(Firstname);
      setLastname(Lastname);
      setAddress(Address);
      setPhonenumber(Phonenumber);
      setDate(Date || "1999-01-01");
      setLoading(false);

      let adminCheck = await verifyAdmin(getUserId());
      setAdmin(adminCheck);
    }
    start();

    setNavVisibility(true);
    setCurrentNav(3);
  }, []);

  return (
    <div className="account main">
      {!verifyAuth() && (
        <ModalNotification
          modalIcon={"fa-solid fa-circle-exclamation"}
          modalText={
            "You session is expired, login again to enjoy our application"
          }
          modalActions={[
            {
              label: "Okay",
              action: () => {
                navigate("/Auth");
              },
            },
          ]}
          cancelAction={() => {}}
        />
      )}
      {loading && <Loading />}
      <div className="account-sec-1 ">
        <div className="acc-profile-img anim-fade-right">
          <img src={profileImageURL} alt="profile" />
          <div className="acc-change-img">
            <i
              className="fa-solid fa-camera"
              onClick={() => {
                let file = document.createElement("input");
                file.type = "file";

                file.click();
                file.addEventListener("change", async (e) => {
                  let imageFile = e.target.files[0];
                  console.log(imageFile);
                  await uploadProfileImage(getUserId(), imageFile);
                  setProfileImage(imageFile);
                  let imageURL = URL.createObjectURL(imageFile);
                  setProfileImageURL(imageURL);
                });
              }}
            ></i>
          </div>
        </div>
        <p className="acc-email anim-fade-right">{email}</p>
        <p className="acc-name anim-fade-left">
          {lastname} {firstname}
        </p>
        <div className="acc-action"></div>
      </div>
      <div className="account-sec-2 anim-fade-up">
        <input
          placeholder="Enter Firstname"
          value={firstname}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateUser(getUserId(), { Firstname: firstname });
            }
          }}
          onBlur={() => {
            updateUser(getUserId(), { Firstname: firstname });
          }}
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        ></input>
        <input
          placeholder="Enter Lastname"
          value={lastname}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateUser(getUserId(), { Lastname: lastname });
            }
          }}
          onBlur={() => {
            updateUser(getUserId(), { Lastname: lastname });
          }}
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        ></input>
        <input
          placeholder="Enter Address"
          value={address}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateUser(getUserId(), { Address: address });
            }
          }}
          onBlur={() => {
            updateUser(getUserId(), { Address: address });
          }}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        ></input>
        <input
          placeholder="Enter Phone number"
          value={phonenumber}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateUser(getUserId(), { Phonenumber: phonenumber });
            }
          }}
          onBlur={() => {
            updateUser(getUserId(), { Phonenumber: phonenumber });
          }}
          onChange={(e) => {
            setPhonenumber(e.target.value);
          }}
        ></input>
        <input
          placeholder="Date Of Birth"
          type="date"
          value={date}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateUser(getUserId(), { Date: date });
            }
          }}
          onBlur={() => {
            updateUser(getUserId(), { Date: date });
          }}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        ></input>
        <button
          className="sign-out"
          onClick={() => {
            logOutUser();
            navigate("/Auth");
          }}
        >
          Signout
        </button>
        {admin && (
          <button className="admin-btn" onClick={() => navigate("/Admin")}>
            Admin Priviledges
          </button>
        )}
      </div>
    </div>
  );
}

export default Account;
