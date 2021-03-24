import React, { useState, useContext } from "react";
import { MdAccountCircle } from "react-icons/md";
import { AuthContext } from "../../Context/AuthContext";
import { useHttpClient } from "../../Hooks/Httphook";

import Button from "../Button/Button";
import { Link } from "react-router-dom";

import Input from "../Input/Input";

import "./Login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { email, password } = formData;

  const auth = useContext(AuthContext);

  const submitLogin  = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        'http://localhost:5000/api/user/login',
        'POST',
        JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      auth.login(responseData.user.id);
      
    } catch (error) {
      
    }
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="log-in">
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
