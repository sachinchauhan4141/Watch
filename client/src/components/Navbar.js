import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import videoContext from "../context/videos/videoContext";
import alertContext from "../context/alert/alertContext";
import currVideoContext from "../context/currVideo/currVideoContext";

export default function Navbar(props) {
  const context = useContext(alertContext);
  const { showAlert } = context;
  const context1 = useContext(videoContext);
  const { video } = context1;
  const context4 = useContext(currVideoContext);
  const { setCurrVideoId } = context4;

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    props.forceUpdate();
    e.preventDefault();
    console.log(search);
    video.map((e) => {
      if (e.title.startsWith(search)) {
        setCurrVideoId(e._id);
        localStorage.setItem("curr-genre", e.genre);
        localStorage.setItem("curr-video", e._id);
        navigate("/video");
        return "found";
      }
      showAlert("danger", "Video not found...");
      return "not found";
    });
  };

  return (
    <header style={{ marginBottom: "4rem" }}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{ color: "red" }}>
            WatchNowTV
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Platforms
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/Category">
                      Netflix
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Category">
                      Hotstar
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Category">
                      Disney+
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Category">
                      Prime Video
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Category">
                      Xstreme
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Category">
                      Jio Cinema
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Category">
                      Sony Liv
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Category">
                      Other
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About...
                </Link>
              </li>
              {localStorage.getItem("token") && props.user.isAdmin && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link ml-2" to="/addvideo">
                      Add Video
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/addgenre">
                      Add Genre
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mode
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        const bdy = document.getElementById("body");
                        localStorage.setItem("theme", "dark");
                        bdy.setAttribute("data-bs-theme", "dark");
                      }}
                    >
                      Dark
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        const bdy = document.getElementById("body");
                        localStorage.setItem("theme", "light");
                        bdy.setAttribute("data-bs-theme", "light");
                      }}
                    >
                      Light
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
            {localStorage.getItem("token") && (
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {props.user.name}
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/user"
                        onClick={() => {
                          console.log("click");
                        }}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/login"
                        onClick={() => {
                          showAlert("warning", "Logging out...");
                          localStorage.removeItem("token");
                        }}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            )}
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              {localStorage.getItem("token") ? (
                <>
                  <input
                    className="form-control mx-2"
                    type="search"
                    value={search}
                    onChange={handleChange}
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-danger" type="submit">
                    Search
                  </button>
                </>
              ) : (
                <>
                  <Link className="btn btn-outline-danger" to="/login">
                    Login
                  </Link>
                  <Link className="btn btn-outline-danger mx-2" to="/register">
                    Signup
                  </Link>
                </>
              )}
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
