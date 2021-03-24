import React from "react";
import { Link } from "react-router-dom";
import { BsCaretRight } from "react-icons/bs";

import "./HeaderChat.scss";

const HeaderChat = () => {
  return (
    <div className="header-chat">
      <p>
        <BsCaretRight className="caret" />
        <Link to="/chat"> Room name</Link>
      </p>
    </div>
  );
};

export default HeaderChat;
