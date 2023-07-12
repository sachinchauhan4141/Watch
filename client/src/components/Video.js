import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import videoContext from "../context/videos/videoContext";
import currVideoContext from "../context/currVideo/currVideoContext";

function Video(props) {
  const context1 = useContext(videoContext);
  const { video, getAllVideos, getVideo } = context1;
  const context2 = useContext(currVideoContext);
  const { currVideoId, setCurrVideoId } = context2;
  // eslint-disable-next-line
  const [currVideo, setCurrVideo] = useState(null);

  const getCurrVideo = async () => {
    const currVideo = await getVideo(
      currVideoId ? currVideoId : localStorage.getItem("curr-video")
    );
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
    setCurrVideo(currVideo);
  };

  useEffect(() => {
    getAllVideos();
    getCurrVideo();
    // eslint-disable-next-line
  }, [props.update]);

  return (
    <main>
      <div className="container-fluid">
        <div
          className="container-fluid my-2 px-3 py-1"
          // style={{
          //   backgroundColor: "rgb(33, 37, 41)",
          //   color: "white",
          //   borderRadius: "1rem",
          // }}
        >
          <h2 className="">{currVideo && currVideo.title}</h2>
        </div>
        <iframe
          style={{ borderRadius: "1rem" }}
          width="100%"
          height="500vh"
          src={currVideo && currVideo.url}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="container-fluid my-3">
        <div
          className="container-fluid my-2 px-3 py-1 border border-secondary border-5 roundedborder border-secondary border-5 rounded"
          // style={{
          //   backgroundColor: "rgb(33, 37, 41)",
          //   color: "white",
          //   borderRadius: "1rem",
          // }}
        >
          <h3>Similar Content You Will Like....</h3>
          <div className="row" id="category">
            {video &&
              video.map((element) => {
                if (
                  element.genre === Number(localStorage.getItem("curr-genre"))
                ) {
                  return (
                    <div className="col my-3" key={element.id}>
                      <Link
                        onClick={() => {
                          props.forceUpdate();
                          setCurrVideoId(element._id);
                          getCurrVideo(currVideoId);
                          localStorage.setItem("curr-video", element._id);
                        }}
                        to="/video"
                      >
                        <div className="card" style={{ width: "10rem" }}>
                          <img
                            src={`https://www.themoviedb.org/t/p/w220_and_h330_face${element.src}`}
                            className="card-img-top"
                            alt={element.title}
                            style={{ borderRadius: "6px" }}
                          />
                        </div>
                      </Link>
                    </div>
                  );
                } else return "";
              })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Video;