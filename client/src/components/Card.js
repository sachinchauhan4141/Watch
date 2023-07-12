import React, { useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import userContext from "../context/user/userContext";
import videoContext from "../context/videos/videoContext";
import alertContext from "../context/alert/alertContext";
import currVideoContext from "../context/currVideo/currVideoContext";

export default function Card(props) {
  const context1 = useContext(userContext);
  const { user } = context1;
  const context2 = useContext(alertContext);
  const { showAlert } = context2;
  const context3 = useContext(videoContext);
  const { video, getAllVideos, deleteVideo } = context3;
  const context4 = useContext(currVideoContext);
  const { setCurrVideoId } = context4;
  const ref1 = useRef(null);
  // const ref2 = useRef(null);

  useEffect(() => {
    getAllVideos();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {video &&
        video.map((element) => {
          if (element.genre === props.genreid) {
            return (
              <div className="col container p-3" key={element.id}>
                {/* <!-- Button trigger for update modal --> */}
                <button
                  type="button"
                  className="btn btn-primary d-none"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  ref={ref1}
                />
                <div
                  className="card"
                  style={{ width: "10rem", position:'relative',zIndex:'2' }}
                  id={`card-${element.id}`}
                >
                  {user.isAdmin && (
                  // <div
                  //   className="container"
                  // >
                  <div className="container d-flex" style={{position:'absolute',color:'yellow',justifyContent:'space-between'}}>
                    <i
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        // ref2.current.click();
                        deleteVideo(element._id);
                        showAlert("warning", "Note deleted successfully...");
                      }}
                    >
                      Delete
                    </i>
                    <i
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        //open modal
                        ref1.current.click();
                        setCurrVideoId(element._id);
                        props.setUpdated(element._id);
                      }}
                    >
                      update
                    </i>
                  </div>
                )}
                  <Link
                    style={{ cursor: "default" }}
                    onClick={() => {
                      setCurrVideoId(element._id);
                      localStorage.setItem("curr-video", element._id);
                      localStorage.setItem("curr-genre", props.genreid);
                      window.scrollTo(0, 0);
                    }}
                    to="/video"
                  >
                    <img
                      src={`https://www.themoviedb.org/t/p/w220_and_h330_face${element.src}`}
                      className="card-img-top"
                      alt={element.id}
                      style={{borderRadius:'6px'}}
                    />
                  </Link>
                </div>
              </div>
            );
          } else return "";
        })}
    </>
  );
}
