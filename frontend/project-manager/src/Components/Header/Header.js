import React, { useState, useEffect, useRef } from "react";
import { NavLink, BrowserRouter as Router } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdAccountCircle } from "react-icons/md";
import { FiFile } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import Input from "../Input/Input";
import { IoMdArrowDropdown, IoMdAdd } from "react-icons/io";
import { AiOutlineUserAdd } from "react-icons/ai";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";

import "./Header.scss";
import Modal from "../Modal/Modal";

const Header = () => {
  const wrapper = useRef(null);
  const [sideBar, setSideBar] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [issue, setIssue] = useState("");
  const [invite, setInvite] = useState('');
  const showSideBar = () => setSideBar(!sideBar);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapper.current && !wrapper.current.contains(event.target)) {
      setSideBar(false);
      setDropDown(false);
    }
  };

  const cancelModal = () => {
    setShowModal(false);
    setShowInviteModal(false);
  };

  const onChange = (e) => {
    setIssue(e.target.value);
  };

  return (
    <div className="header-container" ref={wrapper}>
      <Modal
        className="small-modal"
        show={showModal}
        onCancel={cancelModal}
        header="New Issue"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button>Create</Button>
          </React.Fragment>
        }
      >
        Create new issue
        <Input
          label="Issue name"
          name="issue"
          value={issue}
          onChange={(e) => onChange(e)}
          required
          small={true}
        ></Input>
      </Modal>
      <Modal
        className="small-modal"
        show={showInviteModal}
        onCancel={cancelModal}
        header="Invite People"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button>Invite</Button>
          </React.Fragment>
        }
      >
        <Input
          label='Invitee email'
          name='invite'
          value={invite}
          onChange={(e) => onChange(e)}
          required
          small={true}
        >
        </Input>
      </Modal>
      <NavLink to="#" className="menu-bars">
        <HiMenuAlt2 onClick={showSideBar} />
      </NavLink>
      <h4 className="title">Flow State</h4>
      <MdAccountCircle
        className="account"
        onClick={() => setDropDown(!dropDown)}
      />
      {dropDown ? <Dropdown /> : null}
      <nav className={sideBar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSideBar}>
          <li>
            <NavLink to="/file" className="file-browser">
              <FiFile className="icons" />
              <p>File Browser</p>
            </NavLink>
          </li>

          <li>
            <NavLink to="/saved" className="file-browser">
              <BsBookmark className="icons" />
              <p>Saved Items</p>
            </NavLink>
          </li>

          <li>
            <NavLink to="/#" className="file-browser">
              <IoMdArrowDropdown className="header-icon" />
              <h3>Issues</h3>
            </NavLink>
            <div className="header_chats">
              <p>Hmm</p>
              <p>Hmm</p>
            </div>
          </li>

          <li>
            <NavLink
              to="/#"
              className="file-browser"
              onClick={() => setShowModal(!showModal)}
            >
              <IoMdAdd className="icons" />
              <p>Add Issues</p>
            </NavLink>
            
          </li>

          <li>
            <NavLink
              to="/#"
              className="file-browser bottom"
              onClick={() => setShowInviteModal(!showInviteModal)}
            >
              <AiOutlineUserAdd className="icons" />
              <p>Add Members</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
