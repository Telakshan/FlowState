import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { FiUsers } from "react-icons/fi";
import Message from "./Message/Message";
import { AiOutlineUserAdd } from "react-icons/ai";
import "./Chat.scss";
import ChatInput from "../ChatInput/ChatInput";
import { AiFillCloseCircle } from "react-icons/ai";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import SearchModal from "../Search/SearchModal";

const Chat = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAddUserModal, setAddShowUserModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);

  const cancelModal = () => {
    setShowModal(false);
    setShowUserModal(false);
    setAddShowUserModal(false);
  };

  return (
    <div className="chat">
      <Modal
        className="small-modal"
        show={showModal}
        onCancel={cancelModal}
        header="Attachments"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button>Create</Button>
          </React.Fragment>
        }
      >
        Create new issue
      </Modal>

      <Modal
        className="small-modal"
        show={showUserModal}
        onCancel={cancelModal}
        header="Show Users"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button>Create</Button>
          </React.Fragment>
        }
      >
        Users
      </Modal>

      <Modal
        className="small-modal"
        show={showAddUserModal}
        onCancel={cancelModal}
        header="Invite Users"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button>Invite User</Button>
          </React.Fragment>
        }
      >
        Users
      </Modal>
      <div className="header">
        <div className="header-info">
          <h2>Room name</h2>
        </div>

        <div className="header-right">
          <GrAttachment onClick={() => setShowModal(!showModal)} />
          <FiUsers onClick={() => setShowUserModal(!showUserModal)} />
          <AiOutlineUserAdd
            onClick={() => setAddShowUserModal(!showAddUserModal)}
          />
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
          <Message user={"Adam Wong"} message={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} />
          <Message user={"Adam Wong"} message={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} />
          <Message user={"Adam Wong"} message={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} />
          <Message user={"Adam Wong"} message={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} />
          <Message user={"Adam Wong"} message={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} /> 
          <div className="chat-input">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
