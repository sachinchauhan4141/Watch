import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserState from "./context/user/userState";
import GenreState from "./context/genres/genreState";
import VideoState from "./context/videos/videoState";
import AlertState from "./context/alert/alertState";
import CurrVideoState from "./context/currVideo/currVideoState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CurrVideoState>
      <UserState>
        <AlertState>
          <GenreState>
            <VideoState>
              <App />
            </VideoState>
          </GenreState>
        </AlertState>
      </UserState>
    </CurrVideoState>
  </React.StrictMode>
);
