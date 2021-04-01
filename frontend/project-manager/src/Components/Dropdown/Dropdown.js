import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

import "./Dropdown.scss";

const Dropdown = () => {
  const auth = useContext(AuthContext);
  let dropDown;

  
  if (auth.token) {
    dropDown = (
      <React.Fragment>
        <Link to="/login" className="link">
          My Account
        </Link>
        <Link to="/#" className="link">
          Log out
        </Link>
      </React.Fragment>
    );
  } else {
    dropDown = (
      <React.Fragment>
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
      </React.Fragment>
    );
  }

  return <div className="cart-dropdown">{dropDown}</div>;
};

export default Dropdown;
