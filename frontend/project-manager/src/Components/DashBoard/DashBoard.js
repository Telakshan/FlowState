import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { BsArrowUpLeft } from "react-icons/bs";
import { HiMenuAlt2 } from "react-icons/hi";

import axios from "axios";

import "./DashBoard.scss";

const DashBoard = () => {
  const auth = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);

  let username;
  useEffect(() => {
    getUsers();
    username = users.find((user) => user.id === auth.userId);
  }, []);

  const getUsers = () => {
    axios.get("http://localhost:5000/api/user/").then((res) => {
      setUsers(res.data.users);
    });
  };

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
