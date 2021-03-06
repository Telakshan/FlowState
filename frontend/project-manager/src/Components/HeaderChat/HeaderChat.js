import React from "react";
import { Link, useHistory } from "react-router-dom";

import "./HeaderChat.scss";

const HeaderChat = ({ name, id, Icon }) => {
  const history = useHistory();

  const selectIssue = () => {
    if (id) {
      history.push(`/room/${id}`);
    } else {
      history.push(name);
    }
  };

  return (
    <div className="header-chat" onClick={selectIssue}>
      {Icon && <Icon className="icon" />}
      <p>
        <Link to="/room">{name}</Link>
      </p>
    </div>
  );
};

export default HeaderChat;
