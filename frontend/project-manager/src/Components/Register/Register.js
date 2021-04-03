import React, { useContext, useState } from "react";
import Button from "../Button/Button";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import Loading from "../Loading/Loading";
import api from '../url';

import "./Register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { name, email, password } = formData;

  const auth = useContext(AuthContext);

  const authSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = formData;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });
    setIsLoading(true);
    try {
      const responseData = await axios.post(
        `${api.userAPI}register`,
        body,
        config
      );
      auth.login(responseData.data.userId, responseData.data.token);
      setIsLoading(false);
    } catch (error) {
      console.error(error, "Register failed");
    }
  };

  const cancelModal = () => {
    setError(false);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="sign-up">
      {isLoading ? <Loading /> : null}
      <MdAccountCircle className="user-icon" />
      <h2 className="title">Sign up</h2>
      {error && (
        <Modal
          // className="small-modal"
          show={setError}
          header="Register in Error"
          onCancel={cancelModal}
          footer={<Button onClick={cancelModal}>Close</Button>}
        >
          Cannot Register. Please try again
        </Modal>
      )}
      <form onSubmit={authSubmit}>
        <Input
          name="name"
          type="text"
          value={name}
          label="full name"
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          type="email"
          value={email}
          label="email"
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type="password"
          value={password}
          label="password"
          onChange={handleChange}
          required
        />

        <Button type="submit">Register</Button>
      </form>
      <p>
        Already have an account?
        <Link to="/login" className="login-link">
          {" "}
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;
