import React, { useContext, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { IoIosSend } from "react-icons/io";

import "./ChatInput.scss";

const ChatInput = ({ roomId }) => {
  const [message, setMessage] = useState("");
  const auth = useContext(AuthContext);

  const sendMessage = async (event) => {
    event.preventDefault();
  
    const userId = auth.userId;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ message, userId });

    try {
      await axios.post(
        `http://localhost:5000/api/room/message/${roomId}`,
        body,
        config
      );
    } catch (error) {
      console.log(error, "Message not sent");
    }
    setMessage("");
  };

  return (
    <form className="form" onSubmit={sendMessage}>
      <input
        className="input"
        placeholder="Enter message here..."
        value={message}
        name="message"
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      {/* <IoIosSend className="icon" onClick={sendMessage} /> */}
      <button type="submit">Send</button>
      <GrAttachment className="attachment" />
    </form>
  );
};

export default ChatInput;
