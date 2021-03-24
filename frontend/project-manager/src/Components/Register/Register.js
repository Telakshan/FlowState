import React, { useContext, useState } from "react";
import Button from "../Button/Button";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../Hooks/Httphook";
import { AuthContext } from "../../Context/AuthContext";
import Input from "../Input/Input";
import Loading from "../Loading/Loading";

import "./Register.scss";

const Register = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const auth = useContext(AuthContext);

  const authSubmit = async (event) => {
    event.preventDefault();
    try {
      const form = new FormData();
      form.append("email", formData.email);
      form.append("password", formData.password);
      const responseData = await sendRequest(
        "http://localhost:5001/api/user/register",
        "POST",
        form
      );
      auth.login(responseData.userId, responseData.token);
    } catch (error) {
      console.error(error, "Register failed");
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <div className="sign-up">
      {isLoading ? <Loading /> : null}
      <MdAccountCircle className="user-icon" />
      <h2 className="title">Sign up</h2>

      <form onSubmit={authSubmit}>
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
