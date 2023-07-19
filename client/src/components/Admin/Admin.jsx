import React, { useContext, useEffect, useState, useRef } from "react";
import videoContext from "../../context/videos/videoContext";
import alertContext from "../../context/alert/alertContext";
import currVideoContext from "../../context/currVideo/currVideoContext";
import Alert from "../Alert";
import { Link } from "react-router-dom";

const Admin = (props) => {
  const context = useContext(alertContext);
  const { showAlert } = context;
  const context1 = useContext(videoContext);
  const { video, getAllVideos, updateVideo, getVideo, deleteVideo } = context1;
  const context3 = useContext(currVideoContext);
  const { currVideoId, setCurrVideoId } = context3;
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const [updatedVideo, setUpdatedVideo] = useState({
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

  useEffect(() => {
    getAllVideos();
    // eslint-disable-next-line
  }, []);

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
  return localStorage.getItem("token") && props.user.isAdmin ? (
    <div className="container">
      {/* <!-- Button trigger for update modal --> */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref1}
      />
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
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleClick();
                  setTimeout(() => {
                    ref1.current.click();
                  }, 1000);
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Button trigger for delete modal --> */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
        ref={ref2}
      />
      {/* modal for delete */}
      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel2"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <Alert alert={props.alert} />
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel2">
                Deleting : {updatedVideo.title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  showAlert("warning", "Note deleted successfully...");
                  deleteVideo(updatedVideo._id);
                  setTimeout(() => {
                    ref2.current.click();
                  }, 1000);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------------------------------- */}
      <div className="py-3 d-flex">
        <h1>Welcome Admin...</h1>
        <div style={{ marginLeft: "45rem" }}>
          <Link className="btn btn-primary mx-2" to="/addvideo">
            Add Video
          </Link>
          <Link className="btn btn-primary" to="/addgenre">
            Add Genre
          </Link>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#Id</th>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Url</th>
            <th scope="col">Src</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {video.map((curr) => {
            return (
              <tr key={curr.id}>
                <th scope="row">{curr.id}</th>
                <td>{curr.title}</td>
                <td>{curr.genre}</td>
                <td>{curr.url}</td>
                <td>{curr.src}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      ref1.current.click();
                      setCurrVideoId(curr._id);
                      setUpdated(curr._id);
                    }}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      ref2.current.click();
                      setUpdated(curr._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div
      style={{
        height: "12rem",
        textAlign: "center",
        paddingTop: "15rem",
      }}
    >
      <h1>Not Allowed.....</h1>
    </div>
  );
};

export default Admin;
