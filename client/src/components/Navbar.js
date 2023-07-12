import React, { useContext } from "react";
import { Link } from "react-router-dom";
import alertContext from "../context/alert/alertContext";

export default function Navbar(props) {
  const context = useContext(alertContext);
  const { showAlert} = context;

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
            <form className="d-flex" role="search">
              {localStorage.getItem("token") ? (
                <>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-danger mx-2" type="submit">
                    Search
                  </button>
                  <Link
                    className="btn btn-outline-danger"
                    to="/login"
                    onClick={() => {
                      showAlert("warning", "Logging out...");
                      localStorage.removeItem("token");
                    }}
                  >
                    Logout
                  </Link>
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
