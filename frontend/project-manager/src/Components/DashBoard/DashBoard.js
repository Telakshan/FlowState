import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "./DashBoard.scss";

const DashBoard = () => {
  const auth = useContext(AuthContext);
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
    </div>
  );
};

export default DashBoard;
