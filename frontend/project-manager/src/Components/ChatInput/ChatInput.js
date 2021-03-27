import React from "react";
import { GrAttachment } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";

import "./ChatInput.scss";

const sendMessage = (e) => {
  e.preventDefault();

  
}

const ChatInput = () => {
  return (
    <form className="form">
      <input className="input" placeholder="Enter message here..." />
        <IoIosSend className='icon'/>
        <GrAttachment className='attachment'/>

    </form>

  
  );
};

export default ChatInput;

//ethnically diverse and vibrant city
//much more affordable housing
//i have extended family in the mid western states of MI and Illinois. 
//Winter is great, ny doesnt have any more winters. i look forward to the 4 seasons.
//
