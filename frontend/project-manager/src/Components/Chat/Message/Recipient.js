import React from "react";

import './Recipient.scss';

const Recipient = () => {
  return (
    <p className="recipient-message">
      <span className="user-name">Recipient</span>
      This is a message
      <span className="chat-timestamp">{new Date().toUTCString()}</span>
    </p>
  );
};

export default Recipient;
