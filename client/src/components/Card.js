import React, { useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import videoContext from "../context/videos/videoContext";
import currVideoContext from "../context/currVideo/currVideoContext";

export default function Card(props) {
  const context3 = useContext(videoContext);
  const { videos, getAllVideos} = context3;
  const context4 = useContext(currVideoContext);
  const { setCurrVideoId } = context4;

  useEffect(() => {
    getAllVideos();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {videos &&
        videos.map((element) => {
          if (element.genre === props.genreid) {
            return (
              <div className="col container p-3" key={element.id}>
                <div
                  className="card"
                  style={{ width: "10rem", position:'relative',zIndex:'2' }}
                  id={`card-${element.id}`}
                >
                  <Link
                    style={{ cursor: "default" }}
                    onClick={() => {
                      setCurrVideoId(element._id);
                      localStorage.setItem("curr-video", element._id);
                      localStorage.setItem("curr-genre", props.genreid);
                      window.scrollTo(0, 0);
                    }}
                    to={`/video/${element._id}`}
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
