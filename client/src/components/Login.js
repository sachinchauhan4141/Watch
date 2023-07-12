import React, { useContext, useState } from "react";
import UserContext from "../context/user/userContext";
import alertContext from "../context/alert/alertContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const context1 = useContext(alertContext);
  const { showAlert } = context1;
  const context2 = useContext(UserContext);
  const { authUser } = context2;
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await authUser(currentUser.email, currentUser.password);
    const user = await response.json();
    if (user.success) {
      localStorage.setItem("token", user.authtoken);
      showAlert("success", "Logged in successfully...");
      //redirect to '/'
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      showAlert("danger", "Enter Valid Details...");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h3>Login To WatchNowTV ......</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={currentUser.email}
            onChange={handleChange}
            required
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            required
            value={currentUser.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
