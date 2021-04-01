import React from "react";

import "./Message.scss";

const Message = ({ message, timestamp, user, date }) => {
  return (
    <div className="message">
      <div className="message-info">
        <h4>
          {user}
          <span className="message-timestamp">{date}</span>
        </h4>

        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
