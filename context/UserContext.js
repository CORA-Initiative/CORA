import React, { useContext, useState } from "react";

const UserContext = React.createContext();

export function thisUser() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [userType, setUsertype] = useState("student");
  const [firstName, setFirstName] = useState("First");
  const [middleName, setMiddleName] = useState("Middle");
  const [lastName, setLastName] = useState("Last");
  const [userID, setUserID] = useState(null);
  const [preTestScores, setPreTestScore] = useState({
    word_reading_score: 0,
    comprehension_score: 0,
    reading_rate: 0,
  });
  const [postTestScores, setPostTestScore] = useState({
    word_reading_score: 0,
    comprehension_score: 0,
    reading_rate: 0,
  });

  const value = {
    userType,
    setUsertype,
    firstName,
    setFirstName,
    middleName,
    setMiddleName,
    lastName,
    setLastName,
    userID,
    setUserID,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
