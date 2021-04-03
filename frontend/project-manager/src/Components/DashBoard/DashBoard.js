import React from "react";
import { BsArrowUpLeft } from "react-icons/bs";
import { HiMenuAlt2 } from "react-icons/hi";

import "./DashBoard.scss";

const DashBoard = () => {
  return (
    <div className="dashboard">
      <h1 className="welcome">Welcome to Flow State</h1>
      <h2>You are logged in</h2>
      <h4>
        Please add or pick a channel to start communicating with your team
      </h4>
      <h4>Let's get in the flow state</h4>
      <h4>
        Click
        <HiMenuAlt2 className="menu" />
        to begin
      </h4>

      <BsArrowUpLeft className="arrow" />
    </div>
  );
};

export default DashBoard;
