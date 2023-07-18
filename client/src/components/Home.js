import React, { useState, useContext } from "react";
import Main from "./Main";
import videoContext from "../context/videos/videoContext";

export default function Home(props) {
  const context2 = useContext(videoContext);
  const { getVideo } = context2;
  const [ setUpdatedVideo] = useState({
    id: "",
    genre: "",
    title: "",
    src: "",
    url: "",
  });

  const setUpdated = async (_id) => {
    const currVideo = await getVideo(_id);
    setUpdatedVideo(currVideo);
  };

  return (
    <main>
      {/* carousel */}
      <div id="carouselExample" className="carousel slide my-2 mx-3">
        <div
          className="carousel-inner"
          style={{
            borderRadius: "1rem",
          }}
        >
          <div className="carousel-item active">
            <img
              style={{ height: "35rem" }}
              src="https://images.hdqwalls.com/wallpapers/minimal-mountains-landscape-4k-az.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              style={{ height: "35rem" }}
              src="https://images.hdqwalls.com/wallpapers/minimal-mountains-landscape-4k-az.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              style={{ height: "35rem" }}
              src="https://images.hdqwalls.com/wallpapers/minimal-mountains-landscape-4k-az.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* main container */}
      <div className="my-3" id="main">
        <Main setUpdated={setUpdated} setLoading={props.setLoading} />
      </div>
    </main>
  );
}
