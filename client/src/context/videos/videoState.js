import { useState } from "react";
import videoContext from "./videoContext";

const VideoState = (props) => {
  const host = "http://localhost:5000";
  // const host = "https://watch-now-tv-da2q.onrender.com";
  const token = localStorage.getItem("token");

  const [video, setVideo] = useState([]);

  //get all videos
  const getAllVideos = async () => {
    const response = await fetch(`${host}/api/video/fetchallvideos`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": token,
      },
    });
    const video = await response.json();
    setVideo(video);
  };

  //get current video
  const getVideo = async (_id) => {
    const response = await fetch(`${host}/api/video/getvideo/${_id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": token,
      },
    });
    const data = await response.json();
    return data.video;
  };

  //add new video
  const addVideo = async (id, genre, title, src, url) => {
    const response = await fetch(`${host}/api/video/addvideo`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ id, genre, title, src, url }),
    });
    return response;
  };

  //update a video
  const updateVideo = async (_id, id, genre, title, src, url) => {
    const response = await fetch(`${host}/api/video/updatevideo/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ id, genre, title, src, url }),
    });
    const data = await response.json();
    return data.success;
  };

  //delete a video
  const deleteVideo = async (id) => {
    const response = await fetch(`${host}/api/video/deletevideo/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "auth-token": token,
      },
    });
    return response;
  };

  return (
    <videoContext.Provider
      value={{
        video,
        addVideo,
        deleteVideo,
        updateVideo,
        getAllVideos,
        getVideo,
      }}
    >
      {props.children}
    </videoContext.Provider>
  );
};

export default VideoState;
