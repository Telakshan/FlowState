import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { FiUsers } from "react-icons/fi";
import Message from "./Message/Message";
import "./Chat.scss";
import ChatInput from "../ChatInput/ChatInput";
import { AiFillCloseCircle } from "react-icons/ai";
import Modal from "../Modal/Modal";
import SearchModal from "../Search/SearchModal";
import Pusher from "pusher-js";
import api from "../url";

const pusher = new Pusher("5001586ab8cef267004c", {
  cluster: "us2",
});

const Chat = () => {
  const { roomId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [roomDetails, setRoomDetails] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios.get(`${api.userAPI}`).then((res) => {
      setUsers(res.data.users);
    });
  };

  useEffect(() => {
    if (roomId) {
      const getMessages = () => {
        axios.get(`${api.roomAPI}${roomId}`).then((res) => {
          setRoomMessages(res.data.messages);
          setRoomDetails(res.data.name);
        });
      };
      getMessages();

      getUsers();

      const channel = pusher.subscribe("room");
      channel.bind("newMessage", function (data) {
        getMessages();
      });
    }
  }, [roomId, setRoomMessages, setRoomDetails]);

  const cancelModal = () => {
    setShowModal(false);
    setShowUserModal(false);
   
  };

  const style ={
    marginTop: "20px"
  }

  return (
    <div className="chat">
      <Modal
        className="small-modal"
        show={showUserModal}
        onCancel={cancelModal}
        header="Show Users"
        footerClass="place-item__modal-actions"
      >
        <ul>
          {users.map((user) => (
            <li style={style} key={user.id}>{user.name}, {user.email}</li>
          ))}
        </ul>
      </Modal>

      <div className="header">
        <div className="header-info">
          <h2>{roomDetails}</h2>
        </div>

        <div className="header-right">
          <GrAttachment onClick={() => setShowModal(!showModal)} />
          <FiUsers onClick={() => setShowUserModal(!showUserModal)} />
          <BsSearch onClick={() => setSearchModal(!searchModal)} />
          {searchModal ? (
            <React.Fragment>
              <SearchModal />
              <AiFillCloseCircle
                className="close"
                onClick={() => setSearchModal(!searchModal)}
              />
            </React.Fragment>
          ) : null}{" "}
        </div>
      </div>

      <div className="chat-body">
        <div className="center-div">
          {roomMessages.map(({ text, name, id, date }) => (
            <Message key={id} message={text} user={name} date={date} />
          ))}
          <div className="chat-input">
            <ChatInput roomId={roomId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
