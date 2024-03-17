import React, { useEffect, useState } from "react";
import "./Saved-style.css";
import Loading from "../components/Loading";
import MovieCard from "../parent-components/MovieCard";
import { fetchSavedMovies } from "../database/backend";
import { getUserId, verifyAuth } from "../database/clientstorage";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import ModalNotification from "../parent-components/ModalNotification";

function Saved({ setCurrentNav, setNavVisibility, navVisibility }) {
  const [savedMovieList, setSavedMovieList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setNavVisibility(true);
    setCurrentNav(2);
    getUserId() &&
      fetchSavedMovies(getUserId()).then((movies) => setSavedMovieList(movies));
  }, []);
  return (
    <div className="saved main anim-fade-right">
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
      <h3>Review Saved Video</h3>
      {savedMovieList ? (
        savedMovieList.length > 0 ? (
          <div className="saved-list-n anim-fade-left">
            {savedMovieList.map((movie) => (
              <MovieCard movieInfo={movie} />
            ))}
          </div>
        ) : (
          <Message
            message={"No Saved Movies"}
            iconClass={"fa-regular fa-face-sad-tear"}
          />
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Saved;
