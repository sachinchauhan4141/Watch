import React, { useContext, useState } from "react";
import UserContext from "../context/user/userContext";
import alertContext from "../context/alert/alertContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const context1 = useContext(alertContext);
  const { showAlert } = context1;
  const context2 = useContext(UserContext);
  const { createUser } = context2;
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createUser(
      newUser.name,
      newUser.email,
      newUser.password
    );
    const user = await response.json();
    if (user.success) {
      localStorage.setItem("token", user.authtoken);
      showAlert("success", "Registered successfully...");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      showAlert("danger", "User with this email already exists...");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mb-3">
      <h3>Register To WatchNowTv....</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            required
            minLength={3}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={newUser.email}
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
            value={newUser.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Register;
