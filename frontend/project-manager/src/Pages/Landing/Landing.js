import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import {AiFillCheckCircle} from 'react-icons/ai'
import Button from "../../Components/Button/Button";

import "./Landing.scss";

const Landing = () => {
  return (
    <div className="page">
      <div className="landing">
        <h1>Welcome to Project Manager</h1>

        <h3>Powerful application to bring your team together</h3>

        <Link to="/register">
          <Button>Get Started</Button>
        </Link>
      </div>
      <div className="info-section">
        <div className="card">
          <AiOutlineUsergroupAdd className="connect" />
          <h3>Connect with your team</h3>
          <p><AiFillCheckCircle className='check'/>Stay in contact with your team members</p>
        </div>

        <div className="card">
          <BsCameraVideo className="connect" />
          <h3>Connect on a call</h3>
          <p><AiFillCheckCircle className='check'/>Effortlessly connect with yout team members while working on projects</p>
        </div>

        <div className="card">
          <FaTasks className="connect" />
          <h3>Collaborate on projects effortlessly</h3>
          <p><AiFillCheckCircle className='check'/>All-in-One Workspace for everything related to your work</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
