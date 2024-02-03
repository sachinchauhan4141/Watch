import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import videoContext from "../context/videos/videoContext";

function Video(props) {
  const {id:videoId} = useParams();
  const context1 = useContext(videoContext);
  const { videos, getAllVideos, getVideo } = context1;
  const [currVideo, setCurrVideo] = useState(null);

  const getCurrVideo = async () => {
    const currVideo = await getVideo(
      videoId
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
        >
          <h2 className="">{currVideo && currVideo.title}</h2>
        </div>
        <iframe
          style={{ borderRadius: "1rem",width:"100%",maxHeight: "50rem",minHeight:"35rem" }}
          src={currVideo && currVideo.url}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="container-fluid my-3">
        <div
          className="container-fluid my-2 px-3 py-1 border border-secondary border-5 roundedborder border-secondary border-5 rounded"
        >
          <h3>Similar Content You Will Like....</h3>
          <div className="row" id="category">
            {videos &&
              videos.map((element) => {
                if (
                  element.genre === Number(localStorage.getItem("curr-genre"))
                ) {
                  return (
                    <div className="col my-3" key={element.id}>
                      <Link
                        onClick={() => {
                          props.forceUpdate();
                        }}
                        to={`/video/${element._id}`}
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