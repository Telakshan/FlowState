import React from "react";
import { Link } from "react-router-dom";

import "./Dropdown.scss";

const Dropdown = () => {
  return (
    <div className="cart-dropdown">
      <Link exact to="/login" className="link">
        My Account
      </Link>

      <Link exact to="/login" className="link">
        Log in
      </Link>

      <Link exact to="/register" className="link">
        Register
      </Link>

      <Link exact to="/help" className="link">
        Help
      </Link>

      <Link to="/" className="link">
        Info
      </Link>
    </div>
  );
};

export default Dropdown;
