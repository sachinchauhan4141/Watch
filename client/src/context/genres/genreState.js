import React , { useState } from "react";
import genreContext from "./genreContext";

const GenreState = (props) => {
  const host = "https://watch-now-tv-da2q.onrender.com:5000";
  const token = localStorage.getItem('token');

  const [genres, setGenre] = useState([]);
  
  //get all genres
  const getAllGenres = async () => {
    const response = await fetch(
      `${host}/api/genre/fetchallgenres`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "auth-token": token,
        },
      }
    );
    const genre = await response.json();
    setGenre(genre);
    return response;
  };

  //add new genre
  const addGenre = async (id,title) => {
    const response = await fetch(`${host}/api/genre/addgenre`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({id,title})
    });
    return response;
  };

  //update a genre
  const updateGenre = async (id, title) => {
    const response = await fetch(`${host}/api/genre/updategenre/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({id,title})
    });
    return response;
  };

  //delete a genre
  const deleteGenre = async (id) => {
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
    <genreContext.Provider
      value={{ genres, addGenre, deleteGenre, updateGenre, getAllGenres }}
    >
      {props.children}
    </genreContext.Provider>
  );
};

export default GenreState;
