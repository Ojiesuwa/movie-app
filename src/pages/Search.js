import React, { useEffect, useState } from "react";
import "./Search-style.css";
import { useNavigate } from "react-router-dom";
import { verifyAuth } from "../database/clientstorage";
import Message from "../components/Message";
import { searchMovie } from "../database/backend";
import MovieCard from "../parent-components/MovieCard";

function Search({ setNavVisibility, navVisibility }) {
  const navigate = useNavigate();
  const [searchHistory, setSearchHistory] = useState();
  const [searchResult, setSearchResult] = useState();

  useEffect(() => {
    const redirect = verifyAuth() || navigate("/Auth");
    setNavVisibility(true);
  }, []);

  async function initiateSearch(queryString) {
    let response = await searchMovie(queryString);
    setSearchResult(response.length === 0 ? "empty" : response);
  }

  return (
    <div className="search main">
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter a keyword here..."
          onKeyDown={(e) => {
            e.target.value.length !== 0 && initiateSearch(e.target.value);
          }}
        ></input>
      </div>
      <div className="search-result">
        {!searchResult ? (
          <Message
            iconClass={"fa-solid fa-circle-exclamation"}
            message={"Enter a search query above"}
          />
        ) : searchResult === "empty" ? (
          <Message
            iconClass={"fa-regular fa-sad-tear"}
            message={"Search Not Found"}
          />
        ) : (
          <div className="saved-list-n anim-fade">
            {searchResult.map((movie) => (
              <MovieCard movieInfo={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
