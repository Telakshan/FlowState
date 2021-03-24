import React from "react";

import "./Input.scss";

const Input = ({ handleChange, label, ...otherProps }) => {

  return (
    <div className="group">
      <input className={`form-input ${otherProps.small ? 'small' : ''}`} onChange={handleChange} {...otherProps} />
      {label ? (
        <label
          className={`form-input-label ${otherProps.value.length ? 'shrink' : ''}`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default Input;
