import React from "react";
import { GrAttachment } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";
import Input from "../Input/Input";

import "./ChatInput.scss";

const sendMessage = (e) => {
  e.preventDefault();
};

const ChatInput = () => {
  return (
    <form className="form">
      <input className="input" placeholder="Enter message here..." />
      <IoIosSend className="icon" />
      <GrAttachment className="attachment" />
    </form>
  );
};

export default ChatInput;
