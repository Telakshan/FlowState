import React, { useContext } from "react";

const PeopleContext = React.createContext();

const PeopleContext = ({ children }) => {
  return <PeopleContext.Provider>{children}</PeopleContext.Provider>;
};

export default PeopleContext;
