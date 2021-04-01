import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, BrowserRouter as Router } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdAccountCircle } from "react-icons/md";
import { FiFile } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import Input from "../Input/Input";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { IoMdArrowDropdown, IoMdAdd } from "react-icons/io";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import "./Header.scss";
import Modal from "../Modal/Modal";
import HeaderChat from "../HeaderChat/HeaderChat";
import Pusher from "pusher-js";

const pusher = new Pusher("5001586ab8cef267004c", {
  cluster: "us2",
});

const Header = () => {
  const wrapper = useRef(null);
  const [sideBar, setSideBar] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [issues, setIssue] = useState([]);
  const [issueName, setIssueName] = useState("");
  const [invite, setInvite] = useState("");
  const auth = useContext(AuthContext);

  const showSideBar = () => setSideBar(!sideBar);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  useEffect(() => {
    getIssueList();

    const channel = pusher.subscribe("issues");
    channel.bind("newIssue", function (data) {
      getIssueList();
    });
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
    setIssueName(e.target.value);
  };

  const onSetEmail = (e) => {
    setInvite(e.target.value);
  };

  const getIssueList = () => {
    axios.get("http://localhost:5000/api/room/").then((res) => {
      setIssue(res.data.issues);
    });
  };

  const addIssue = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ issueName });
    try {
      await axios.post(
        "http://localhost:5000/api/room/createissue",
        body,
        config
      );
      setShowModal(false);
    } catch (error) {
      console.error(error, "Error creating issue");
    }
  };

  const sendEmail = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ invite });
    try {
      await axios.post("http://localhost:5000/api/invite", body, config);
      setShowModal(false);
    } catch (error) {
      console.error(error, "Cannot send message");
    }
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
            <Button onClick={addIssue}>Add Issue</Button>
          </React.Fragment>
        }
      >
        Create new issue
        <Input
          label="Issue name"
          name="issue"
          value={issueName}
          onChange={(e) => onChange(e)}
          required
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
            <Button onClick={sendEmail}>Invite</Button>
          </React.Fragment>
        }
      >
        <Input
          label="Invitee email"
          name="invite"
          value={invite}
          onChange={(e) => onSetEmail(e)}
          required
        ></Input>
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
            <HeaderChat name={"File Browser"} Icon={FiFile} />
          </li>

          <li>
            <HeaderChat name={"Saved Items"} Icon={BsBookmark} />
          </li>

          <li>
            <NavLink to="/#" className="file-browser">
              <IoMdArrowDropdown className="header-icon" />
              <h3>Issues</h3>
            </NavLink>
            <div className="header_chats">
              {auth.isLoggedIn ? (
                issues.map((issue) => (
                  <HeaderChat
                    key={issue.id}
                    name={issue.issueName}
                    id={issue.id}
                  />
                ))
              ) : (
                <p>No Issues added</p>
              )}
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
              <AiOutlineUsergroupAdd className="icons" />
              <p>Add Members</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
