import React from "react";
import { BsSearch } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import "./SearchModal.scss";

const SearchModal = () => {
  return (
    <div className="search-modal">
      <input></input>
      <BsSearch className="second-search" />
      <AiFillCloseCircle className="second-search" />
    </div>
  );
};

export default SearchModal;
