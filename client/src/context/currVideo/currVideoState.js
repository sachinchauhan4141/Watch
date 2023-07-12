import React, { useState } from "react";
import CurrVideoContext from "./currVideoContext";

const CurrVideoState = (props) => {
  const [currVideoId, setCurrVideoId] = useState(null);

  return (
    <CurrVideoContext.Provider
      value={{ currVideoId, setCurrVideoId }}
    >
      {props.children}
    </CurrVideoContext.Provider>
  );
};

export default CurrVideoState;
