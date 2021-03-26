import React from "react";

import "./Message.scss";

const Message = ({ message, timestamp, user }) => {
  return (
    <div className="message">
      <div className="message-info">
        <h4>
          {user}
          <span className="message-timestamp">{new Date().toUTCString()}</span>
        </h4>

        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
