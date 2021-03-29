import React from "react";
import { Link, useHistory } from "react-router-dom";
import { BsCaretRight } from "react-icons/bs";

import "./HeaderChat.scss";

const HeaderChat = ({name, id}) => {

  const history = useHistory();

  const selectIssue = () => {
    if(id){
      history.push(`/room/${id}`)
    }else{
      history.push(name);
    }
  }
  return (
    <div className="header-chat">
      <p>
        <BsCaretRight className="caret" />
        <Link to="/room">{name}</Link>
      </p>
    </div>
  );
};

export default HeaderChat;
