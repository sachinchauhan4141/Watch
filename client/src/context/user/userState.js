import { useState } from "react";
import userContext from "./userContext";

const UserState = (props) => {
  // const host = "http://localhost:5000";
  // const host = "https://watch-now-tv-da2q.onrender.com";
  const token = localStorage.getItem("token");

  const [user, setUser] = useState([]);

  //get all user
  const getUser = async () => {
    const response = await fetch(`/api/auth/getuser`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": token,
      },
    });
    const user = await response.json();
    setUser(user);
  };

  //add new user
  const createUser = async (name, email, password) => {
    const response = await fetch(`/api/auth/createuser`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    return response;
  };

  //login a user
  const authUser = async (email, password) => {
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response;
  };

  //update a user requires login
  const updateUser = async (name, email) => {
    const response = await fetch(`/api/auth/updateuser`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ name, email }),
    });
    return response;
  };

  return (
    <userContext.Provider
      value={{ user, createUser, authUser, getUser, updateUser }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
