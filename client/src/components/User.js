import React, { useContext, useState } from "react";
import UserContext from "../context/user/userContext";

const User = () => {
  const context2 = useContext(UserContext);
  const { user } = context2;
  const [ newDetails, setDetails ] = useState(user);

  const handleChange = (e) => {
    setDetails({ ...newDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h3>Update Credentials...</h3>
      <form >
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
            value={user.name}
            onChange={handleChange}
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
            value={user.email}
            onChange={handleChange}
            required
            aria-describedby="emailHelp"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default User;
