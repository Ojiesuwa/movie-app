import React, { useEffect, useState } from "react";
import "./View-style.css";
import ActionIcon from "../components/ActionIcon";
import StarReview from "../components/StarReview";
import Info from "../components/Info";
import {
  fetchMovie,
  getUserCurrentWatch,
  toggleMovieSave,
  verifySave,
} from "../database/backend";
import { getUserId, verifyAuth } from "../database/clientstorage";
import Loading from "../components/Loading";
import { validateValue } from "../aiders/ValidateValue";
import { useNavigate } from "react-router-dom";

function View() {
  const [movieData, setMovieData] = useState();
  const [saved, setSaved] = useState(false);
  const [movieId, setMovieId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = verifyAuth() || navigate("/Auth");

    async function startScript() {
      console.log("movie details loading");
      let movieID = await getUserCurrentWatch(getUserId());
      setMovieId(movieID);
      let md = await fetchMovie(movieID);
      setMovieData(md);

      console.log("verify save");
      verifySave(getUserId(), movieID).then((response) => {
        setSaved(response);
      });
    }
    startScript();
  }, []);

  if (movieData) {
    const { Title, URL, Rating, Plot, id } = movieData;

    let dataForDisplay = { ...movieData };
    delete dataForDisplay.Title;
    delete dataForDisplay.Rating;
    delete dataForDisplay.URL;
    delete dataForDisplay.Plot;
    delete dataForDisplay.Cover;
    delete dataForDisplay.id;
    delete dataForDisplay.QueryKey;
    delete dataForDisplay.timestamp;

    let allKeys = Object.keys(dataForDisplay);
    console.log("keys are", allKeys, dataForDisplay);

    return (
      <div className="view main">
        <div className="view-port">
          <video controls src={URL}></video>
        </div>
        <div className="main-info">
          <h3 className="movie-title">
            {Title}{" "}
            <div className="movie-action">
              {/* <ActionIcon iconClass={"fa-solid fa-download"} /> */}
              <ActionIcon
                iconClass={`${saved ? "fa-solid" : "fa-regular"} fa-heart`}
                onClick={() => {
                  toggleMovieSave(getUserId(), movieId).then((response) => {
                    setSaved(!response);
                  });
                }}
              />
            </div>{" "}
          </h3>
          <div className="movie-review">
            <StarReview review={Math.round(Rating / 1)} />
          </div>
          <p className="movie-plot">{Plot}</p>
        </div>
        <div className="other-info">
          {allKeys.map((key) => {
            return (
              <Info title={key} value={validateValue(dataForDisplay[key])} />
            );
          })}

          {/* <Info title={"Language"} value={"English"} /> */}
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}

export default View;
