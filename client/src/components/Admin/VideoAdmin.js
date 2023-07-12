import React, { useContext, useState } from "react";
import videoContext from "../../context/videos/videoContext";
import alertContext from "../../context/alert/alertContext";

const VideoAdmin = () => {
  const context1 = useContext(alertContext);
  const { showAlert } = context1;
  const context2 = useContext(videoContext);
  const { addVideo } = context2;
  const [newVideo, setNewVideo] = useState({
    id: 0,
    genre: 0,
    title: "",
    src: "",
    url: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addVideo(
      newVideo.id,
      newVideo.genre,
      newVideo.title,
      newVideo.src,
      newVideo.url
    );
    const video = await response.json();
    if (video.success) {
      showAlert("success", "Saved successfully...");
    } else {
      showAlert("danger", video.msg);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewVideo({ ...newVideo, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h3>Add Video...</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3 mt-3">
          <label htmlFor="id" className="form-label">
            Id
          </label>
          <input
            type="number"
            className="form-control"
            id="id"
            name="id"
            value={newVideo.id}
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
            value={newVideo.title}
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
            value={newVideo.genre}
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
            value={newVideo.src}
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
            value={newVideo.url}
            placeholder="video url..."
            onChange={handleChange}
            required
            minLength={10}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default VideoAdmin;
