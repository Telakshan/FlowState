import React, { useContext, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import api from '../url';

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
        `${api.roomAPI}message/${roomId}`,
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
      <button type="submit" className="send">
        Send
      </button>
      <GrAttachment className="attachment" />
    </form>
  );
};

export default ChatInput;
