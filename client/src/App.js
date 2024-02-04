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
import Admin from "./components/Admin/Admin";
import Warning from "./components/Warning";

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
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
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
            token ? (
              <Home user={user} alert={alert} setLoading={setLoading} />
            ) : (
              <Warning />
            )
          }
        />
        <Route
          path="/Video/:id"
          element={
            token ? (
              <Video update={update} forceUpdate={forceUpdate} />
            ) : (
              <Warning />
            )
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
              {user.isAdmin ? <GenreAdmin /> : <Warning />}
            </>
          }
        />
        <Route
          path="/addvideo"
          element={
            <>
              <Alert alert={alert} />
              {user.isAdmin ? <VideoAdmin /> : <Warning />}
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
        <Route
          path="/admin"
          element={
            <>
              <Admin user={user} alert={alert} />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
