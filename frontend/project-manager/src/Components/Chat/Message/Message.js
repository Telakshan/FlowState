import React from "react";

import "./Message.scss";

const Message = () => {
  return (
    <p className="chat-message">
      <span className="user-name">Adam Wong</span>
      This is a message
      <span className="chat-timestamp">{new Date().toUTCString()}</span>
    </p>
  );
};

export default Message;
