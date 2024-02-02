import React, { useContext, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import videoContext from "../context/videos/videoContext";
import alertContext from "../context/alert/alertContext";

export default function Navbar(props) {
  const context = useContext(alertContext);
  const { showAlert } = context;
  const context1 = useContext(videoContext);
  const { videos } = context1;
  const ref1 = useRef(null);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    props.forceUpdate();
    e.preventDefault();
    videos.map((e) => {
      if (e.title.startsWith(search)) {
        localStorage.setItem("curr-genre", e.genre);
        navigate("/video/"+e._id);
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
            <span className="navbar-toggler-icon" ref={ref1}></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                  onClick={() => {
                    ref1.current.click();
                  }}
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("token") && props.user.isAdmin && (
                <li>
                  <Link
                    className="nav-link"
                    to="/admin"
                    role="button"
                    onClick={() => {
                      ref1.current.click();
                    }}
                  >
                    Admin
                  </Link>
                </li>
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
                        ref1.current.click();
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
                        ref1.current.click();
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
                          ref1.current.click();
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
                          ref1.current.click();
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
                  <button
                    className="btn btn-outline-danger"
                    type="submit"
                    onClick={() => {
                      ref1.current.click();
                    }}
                  >
                    Search
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="btn btn-outline-danger"
                    to="/login"
                    onClick={() => {
                      ref1.current.click();
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-outline-danger mx-2"
                    to="/register"
                    onClick={() => {
                      ref1.current.click();
                    }}
                  >
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
