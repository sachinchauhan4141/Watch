import React,{useState} from "react";
import alertContext from "./alertContext";

const AlertState = (props) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({
      type: type,
      message: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <alertContext.Provider value={{ alert, showAlert}}>
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
