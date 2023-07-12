import React, { useContext, useState } from "react";
import genreContext from "../../context/genres/genreContext";
import alertContext from "../../context/alert/alertContext";

const GenreAdmin = (props) => {
  const context1 = useContext(alertContext);
  const { showAlert } = context1;
  const context2 = useContext(genreContext);
  const { addGenre } = context2;
  const [newGenre, setNewGenre] = useState({
    id: 0,
    title: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addGenre(newGenre.id, newGenre.title);
    const genre = await response.json();
    if (genre.success) {
      showAlert("success", "Saved successfully...");
    } else {
      showAlert("danger", genre.msg);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewGenre({ ...newGenre, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h3>Add genre</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3 mt-3">
          <label htmlFor="id" className="form-label">
            id
          </label>
          <input
            type="number"
            className="form-control"
            id="id"
            name="id"
            value={newGenre.id}
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
            value={newGenre.title}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default GenreAdmin;
