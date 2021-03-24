import React, { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

import Input from "../Input/Input";

import "./Login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (event) => {
    const { value, name } = event.target;

    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="log-in">
      <MdAccountCircle className="user-icon" />
      <h2 className="title">Log in</h2>

      <form>
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
