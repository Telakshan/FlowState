import React from "react";
import { Link } from "react-router-dom";

import "./Dropdown.scss";

const Dropdown = () => {
  return (
    <div className="cart-dropdown">
      <Link to="/login" className="link">
        My Account
      </Link>

      <Link to="/login" className="link">
        Log in
      </Link>

      <Link to="/register" className="link">
        Register
      </Link>

      <Link to="/help" className="link">
        Help
      </Link>

      <Link to="/" className="link">
        Info
      </Link>
    </div>
  );
};

export default Dropdown;
