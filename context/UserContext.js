import React, { useContext, useState } from "react";

const UserContext = React.createContext();

export function thisUser() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
  // User
  const [userType, setUsertype] = useState("student");
  const [firstName, setFirstName] = useState("Juan");
  const [middleName, setMiddleName] = useState("Rizal");
  const [lastName, setLastName] = useState("dela Cruz");
  const [userID, setUserID] = useState(null);

  // Students only
  const [section, setSection] = useState("Mirasol");
  const [gradeLevel, setGradeLevel] = useState(4);
  const [preTestScores, setPreTestScores] = useState({
    word_reading_score: 0,
    comprehension_score: 0,
    reading_rate: 0,
  });
  const [postTestScores, setPostTestScores] = useState({
    word_reading_score: 0,
    comprehension_score: 0,
    reading_rate: 0,
  });

  // Passage
  const [passage, setPassage] = useState({
    title: "Liquids Good for You :)",
    grade_level: 9,
    set_category: "A",
    type: "Post Test",
    instruction:
      "Do you want to know the liquids that are good for your health? Read the next selection. :)",
    text: "There are many liquids that are good for our health like water, fruit juice, and milk. Milk makes our bones strong. Juice gives us vitamins, while water cleans our body. Let's drink milk, juice, and water to make us healthy. :)",
    quiz: {
      question: "Who has a bib?",
      answer_key: "Bim-bim",
      choices: ["Bim-bim", "Den-den"],
    },
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
    section,
    setSection,
    gradeLevel,
    setGradeLevel,
    preTestScores,
    setPreTestScores,
    postTestScores,
    setPostTestScores,
    passage,
    setPassage,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
