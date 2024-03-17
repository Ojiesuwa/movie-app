import React from "react";
import "./MovieCategory-style.css";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

function MovieCategory({ categoryName, categoryMovies }) {
  return (
    <div className="movie-category anim-fadex`">
      <h3 className="category-name">{categoryName}</h3>
      <div className="movie-list">
        {categoryMovies.map((movie) => {
          return <MovieCard movieInfo={movie} />;
        })}
      </div>
    </div>
  );
}

export default MovieCategory;
