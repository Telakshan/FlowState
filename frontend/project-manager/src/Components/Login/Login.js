import React, { useState, useContext } from "react";
import { MdAccountCircle } from "react-icons/md";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import Loading from "../Loading/Loading";

import Button from "../Button/Button";
import { Link } from "react-router-dom";

import Input from "../Input/Input";

import "./Login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = formData;

  const auth = useContext(AuthContext);

  const submitLogin = async (event) => {
    event.preventDefault();
    const { email, password } = formData;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    setIsLoading(true);
    try {
      const responseData = await axios.post(
        "http://localhost:5000/api/user/login",
        body,
        config
      );
      auth.login(responseData.data.userId, responseData.data.token);
      setIsLoading(false);
    } catch (error) {
      console.error(error, "Log in failed");
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="log-in">
      {isLoading ? <Loading /> : null}
      <MdAccountCircle className="user-icon" />
      <h2 className="title">Log in</h2>

      <form onSubmit={submitLogin}>
        <Input
          name="email"
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
        <div className="button">
          <Button type="submit">Log in</Button>
        </div>
      </form>
      <p>
        Need to create an account?{" "}
        <Link to="/register" className="register-link">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
