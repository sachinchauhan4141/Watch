import React from "react";

function Alert(props) {
  const capitalize = (word) => {
    if (word === "danger") {
      return "Error";
    }
    if (word === "warning") {
      return "Warning";
    }
    return "Success";
  };

  return (
    <div style={{ height: "4rem" }}>
    {props.alert && (
      <div className={`alert alert-${props.alert.type}`} role="alert">
        {capitalize(props.alert.type)} : {props.alert.message}
      </div>
    )}
    </div>
  );
}

export default Alert;
