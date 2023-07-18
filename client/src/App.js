import React, { useState, useEffect, useContext, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Video from "./components/Video";
import GenreAdmin from "./components/Admin/GenreAdmin";
import VideoAdmin from "./components/Admin/VideoAdmin";
import UserContext from "./context/user/userContext";
import alertContext from "./context/alert/alertContext";
import User from "./components/User";

function App() {
  const context1 = useContext(alertContext);
  const { alert } = context1;
  const context2 = useContext(UserContext);
  const { user, getUser } = context2;
  const [progress, setProgress] = useState(0);
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);
  const setLoading = (progress) => {
    setProgress(progress);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    }
    // eslint-disable-next-line
  }, [update]);

  return (
    <BrowserRouter>
      <Navbar user={user} forceUpdate={forceUpdate} />
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setLoading(0)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {localStorage.getItem("token") ? (
                <Home user={user} alert={alert} setLoading={setLoading} />
              ) : (
                <>
                  <div
                    style={{
                      height: "12rem",
                      textAlign: "center",
                      paddingTop: "15rem",
                    }}
                  >
                    <h1>Login or Register to continue...</h1>
                  </div>
                </>
              )}
            </>
          }
        />
        <Route
          path="/Video"
          element={
            <>
              {localStorage.getItem("token") ? (
                <Video update={update} forceUpdate={forceUpdate} />
              ) : (
                <>
                  <div
                    style={{
                      height: "12rem",
                      textAlign: "center",
                      paddingTop: "15rem",
                    }}
                  >
                    <h1>Login or Register to continue...</h1>
                  </div>
                </>
              )}
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Alert alert={alert} />
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Alert alert={alert} />
              <Register />
            </>
          }
        />
        <Route
          path="/addgenre"
          element={
            <>
              <Alert alert={alert} />
              {user.isAdmin ? (
                <GenreAdmin />
              ) : (
                <>
                  <div
                    style={{
                      height: "12rem",
                      textAlign: "center",
                      paddingTop: "15rem",
                    }}
                  >
                    <h1>Not Allowed.....</h1>
                  </div>
                </>
              )}
            </>
          }
        />
        <Route
          path="/addvideo"
          element={
            <>
              <Alert alert={alert} />
              {user.isAdmin ? (
                <VideoAdmin />
              ) : (
                <>
                  <div
                    style={{
                      height: "12rem",
                      textAlign: "center",
                      paddingTop: "15rem",
                    }}
                  >
                    <h1>Not Allowed.....</h1>
                  </div>
                </>
              )}
            </>
          }
        />
        <Route
          path="/user"
          element={
            <>
              <Alert alert={alert} />
              <User />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
