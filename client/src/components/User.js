import React, { useContext, useEffect, useState } from "react";
import alertContext from "../context/alert/alertContext";
import UserContext from "../context/user/userContext";

const User = (props) => {
  const context1 = useContext(alertContext);
  const { showAlert } = context1;
  const context2 = useContext(UserContext);
  const { user,updateUser } = context2;
  const [newDetails, setDetails] = useState({
    name:'',
    email:''
  });

  const handleChange = (e) => {
    e.preventDefault();
    setDetails({ ...newDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateUser(newDetails.name, newDetails.email);
    const user = await response.json();
    if (user.success) {
      showAlert("success", "Updated successfully...");
      props.forceUpdate();
    } else {
      showAlert("danger", "User Not Updated ...");
    }
  };

  useEffect(()=>{
    setDetails(user);
    // eslint-disable-next-line
  },[])

  return (
    <div className="container">
      <h3>Update Credentials...</h3>
      <form onSubmit={handleSubmit}>
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
            value={newDetails.name}
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
            value={newDetails.email}
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
