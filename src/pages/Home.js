import React, { useEffect, useRef, useState } from "react";
import "./Home-style.css";
import MovieCard from "../parent-components/MovieCard";
import MovieCategory from "../parent-components/MovieCategory";
import { fetchMoviesByCategory } from "../database/backend";
import { act } from "react-dom/test-utils";
import Loading from "../components/Loading";
import { verifyAuth } from "../database/clientstorage";
import { useNavigate } from "react-router-dom";
import ModalNotification from "../parent-components/ModalNotification";

function Home({ setCurrentNav, setNavVisibility, navVisibility }) {
  const homeRef = useRef();
  const [drama, setDrama] = useState();
  const [action, setAction] = useState();
  const [adventure, setAdventure] = useState();
  const [christopherNolanSpecial, setChristopherNolanSpecial] = useState();
  const [notification, setNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let redirect = false || (
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
    );
    setCurrentNav(0);
    setNavVisibility(true);
    fetchMoviesByCategory({ title: "Genre", value: "Drama" }).then(
      (snapshot) => {
        setDrama(snapshot);
      }
    );

    fetchMoviesByCategory({ title: "Genre", value: "Action" }).then(
      (snapshot) => {
        setAction(snapshot);
      }
    );
    fetchMoviesByCategory({
      title: "Director",
      value: "Christopher Nolan",
      queryCon: "==",
    }).then((snapshot) => {
      setChristopherNolanSpecial(snapshot);
    });
    fetchMoviesByCategory({
      title: "Genre",
      value: "Adventure",
    }).then((snapshot) => {
      setAdventure(snapshot);
    });
  }, []);

  function handleScroll() {
    if (homeRef.current.scrollY < 10) {
      setNavVisibility(true);
    } else {
      setNavVisibility(true);
    }
  }

  window.addEventListener("scroll", () => {
    console.log(window.scrollY);
    if (window.scrollY < 10) {
      setNavVisibility(true);
    } else {
      setNavVisibility(true);
    }
  });

  return (
    <div className="home" ref={homeRef} onScroll={handleScroll}>
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
      <img
        className="back-img"
        src="https://th.bing.com/th/id/OIP.kiG0uF82gsPiv9aASAaiBQHaEK?rs=1&pid=ImgDetMain"
      />
      <div className="hero anim-fade-down">
        <div className="flip"></div>
        <h3 className="intro-text">What's New???</h3>
        <div className="hero-image">
          <div className="fade"></div>
          <img src="https://th.bing.com/th/id/R.dcdc78f552b9f9df5bd4e94a0581ccb2?rik=vzszCUQUQMgGaw&riu=http%3a%2f%2feskipaper.com%2fimages%2fhow-i-met-your-mother-3.jpg&ehk=6Pfh7oSOxVN9DbZOPp15h2BoHUo9MdDXqBVQC6SoX8k%3d&risl=&pid=ImgRaw&r=0" />
        </div>
        <button className="hero-nav-btn">
          Watch Trending <i className="fa-solid fa-arrow-right"></i>{" "}
        </button>
      </div>
      <div className="movies anim-fade-up">
        {drama ? (
          <MovieCategory categoryName={"Drama"} categoryMovies={drama} />
        ) : (
          <Loading />
        )}
        {action ? (
          <MovieCategory
            categoryName={"Action Movies"}
            categoryMovies={action}
          />
        ) : (
          <div></div>
        )}
        {adventure ? (
          <MovieCategory
            categoryName={"Adventure"}
            categoryMovies={adventure}
          />
        ) : (
          <div></div>
        )}
        {christopherNolanSpecial ? (
          <MovieCategory
            categoryName={"Christolan Nolan's Special"}
            categoryMovies={christopherNolanSpecial}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Home;
