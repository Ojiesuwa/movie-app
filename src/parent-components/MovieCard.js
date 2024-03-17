import React from "react";
import "./MovieCard-style.css";
import ActionIcon from "../components/ActionIcon";
import StarReview from "../components/StarReview";
import { Truncate } from "../aiders/Truncate";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../database/clientstorage";
import { setUserCurrentWatch } from "../database/backend";

function MovieCard({ movieInfo }) {
  const navigate = useNavigate();

  const { Title, Cover, Rating, id } = movieInfo;
  const Review = Math.round(Rating / 1);
  return (
    <div
      className="movie-card"
      onClick={() => {
        setUserCurrentWatch(getUserId(), id).then((e) => {
          navigate("/View");
        });
      }}
    >
      <img src={Cover} className="movie-card-background"></img>
      <p className="movie-name">{Truncate(Title, 15)}</p>
      <div className="review">
        <StarReview review={Review} />
      </div>
    </div>
  );
}

export default MovieCard;
