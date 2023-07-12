import React, { useContext, useEffect } from "react";
import Card from "./Card";
import genreContext from "../context/genres/genreContext";

function Main(props) {
  const context = useContext(genreContext);
  const { genres, getAllGenres } = context;

  useEffect(() => {
    props.setLoading(50);
    getAllGenres();
    props.setLoading(100);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {genres &&
        genres.length !== 0 &&
        genres.map((element) => {
          return (
            <div
              className="container-fluid"
              id={`category-${element.id}`}
              key={element.id}
            >
              <div
                className="container-fluid my-2 pt-3 py-1 border border-secondary border-5 rounded"
                // data-bs-theme="dark"
              >
                <h3>{element.title}</h3>
                <div className="row overflow-x-auto flex-nowrap" >
                  <Card setUpdated={props.setUpdated} genreid={element.id}/>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default Main;
