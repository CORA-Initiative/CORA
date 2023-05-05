import React, { useContext, useState } from "react";

const UserContext = React.createContext();

export function thisUser() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
  // User
  const [userType, setUserType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userID, setUserID] = useState("");
  const [studentID, setStudentID] = useState("");
  const [teacherID, setTeacherID] = useState("");

  // Students only
  const [section, setSection] = useState("");
  const [gradeLevel, setGradeLevel] = useState(0);

  const [isPretestEnabled, setIsPretestEnabled] = useState(true);
  const [isPosttestEnabled, setIsPosttestEnabled] = useState(false);

  // Passage
  const [passage, setPassage] = useState({
    title: "Liquids Good for You :)",
    grade_level: 9,
    set_category: "A",
    type: "Pre Test",
    instruction:
      "Do you want to know the liquids that are good for your health? Read the next selection. :)",
    text: "There are many liquids that are good for our health like water, fruit juice, and milk. Milk makes our bones strong. Juice gives us vitamins, while water cleans our body. Let's drink milk, juice, and water to make us healthy. :)",
    quiz: {
      0: {
        question: "Who has a bib?",
        answer_key: "Bim-bim",
        choices: ["Bim-bim", "Den-den"],
      },
    },
  });

  const value = {
    userType,
    setUserType,
    firstName,
    setFirstName,
    middleName,
    setMiddleName,
    lastName,
    setLastName,
    userID,
    setUserID,
    section,
    setSection,
    gradeLevel,
    setGradeLevel,
    passage,
    setPassage,
    studentID,
    setStudentID,
    teacherID,
    setTeacherID,
    isPretestEnabled,
    setIsPretestEnabled,
    isPosttestEnabled,
    setIsPosttestEnabled,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
