import React, { useState, useContext } from "react";
import Main from "./Main";
import alertContext from "../context/alert/alertContext";
import Alert from "./Alert";
import videoContext from "../context/videos/videoContext";
import currVideoContext from "../context/currVideo/currVideoContext";

export default function Home(props) {
  const context1 = useContext(alertContext);
  const { showAlert } = context1;
  const context2 = useContext(videoContext);
  const { updateVideo, getVideo } = context2;
  const context3 = useContext(currVideoContext);
  const { currVideoId } = context3;
  const [updatedVideo, setUpdatedVideo] = useState({
    id: "",
    genre: "",
    title: "",
    src: "",
    url: "",
  });

  const setUpdated = async (_id) => {
    console.log(_id);
    const currVideo = await getVideo(_id);
    console.log(currVideo);
    setUpdatedVideo(currVideo);
  };

  //handle click for update button
  const handleClick = async (e) => {
    const { id, genre, title, src, url } = updatedVideo;
    const success = await updateVideo(currVideoId, id, genre, title, src, url);
    success
      ? showAlert("success", "video updated successfully")
      : showAlert("danger", "video not updated");
  };

  //onchange for input fields
  const handleChange = (e) => {
    setUpdatedVideo({ ...updatedVideo, [e.target.name]: e.target.value });
  };

  return (
    <main>
      {/* <!-- Modal for update --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <Alert alert={props.alert} />
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update : {updatedVideo.title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form className="mt-3">
                <div className="mb-3">
                  <label htmlFor="id" className="form-label">
                    Id
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="id"
                    name="id"
                    value={updatedVideo.id}
                    placeholder="id should be unique"
                    onChange={handleChange}
                    required
                    minLength={1}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={updatedVideo.title}
                    placeholder="name should be unique"
                    onChange={handleChange}
                    required
                    minLength={3}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="genre" className="form-label">
                    Genre
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="genre"
                    name="genre"
                    value={updatedVideo.genre}
                    placeholder="add genre id..."
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="src" className="form-label">
                    Src
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="src"
                    name="src"
                    value={updatedVideo.src}
                    placeholder="image source for thumbnail"
                    onChange={handleChange}
                    required
                    minLength={10}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="url" className="form-label">
                    Url
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="url"
                    name="url"
                    value={updatedVideo.url}
                    placeholder="video url..."
                    onChange={handleChange}
                    required
                    minLength={10}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                // onClick={handleToggle}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* carousel */}
      <div id="carouselExample" className="carousel slide my-2 mx-3">
        <div
          className="carousel-inner"
          style={{
            borderRadius: "1rem",
          }}
        >
          {/* <h1>Welcome , {props.user.name}</h1> */}
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
