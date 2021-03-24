import React from "react";
import { BsSearch } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { FiUsers } from "react-icons/fi";
import Message from "./Message/Message";
import { AiOutlineUserAdd } from "react-icons/ai";
import "./Chat.scss";
import Recipient from "./Message/Recipient";
import ChatInput from '../ChatInput/ChatInput';

const Chat = () => {
  return (
    <div className="chat">
      <div className="header">
        <div className="header-info">
          <h2>Room name</h2>
          <p>Last seen...</p>
        </div>

        <div className="header-right">
          <BsSearch />
          <GrAttachment />
          <FiUsers />
          <AiOutlineUserAdd />
        </div>
      </div>

      <div className="chat-body">
        {/* <p className="chat-message">
          <span className="user-name">Adam Wong</span>
          This is a message
          <span className="chat-timestamp">{new Date().toUTCString()}</span>
        </p> */}
        <div className="center-div">
          <div className="sender">
            <Message />
          </div>
          <div className="recipient">
            <Recipient />
          </div>

          {/*DELETE BELOW */}

          <div className="sender">
            <Message />
          </div>
          <div className="recipient">
            <Recipient />
          </div> <div className="sender">
            <Message />
          </div>
          <div className="recipient">
            <Recipient />
          </div> <div className="sender">
            <Message />
          </div>
          <div className="recipient">
            <Recipient />
          </div> <div className="sender">
            <Message />
          </div>
          <div className="recipient">
            <Recipient />
          </div> <div className="sender">
            <Message />
          </div>
          <div className="recipient">
            <Recipient />
          </div> <div className="sender">
            <Message />
          </div>
          <div className="recipient">
            <Recipient />
          </div>

          <ChatInput />
          
          </div>
        </div>
      </div>
  );
};

export default Chat;
