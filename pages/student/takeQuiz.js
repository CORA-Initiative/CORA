import React, { useEffect, useLayoutEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import { thisUser } from "@/context/UserContext";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function takeQuiz({}) {
  const user = thisUser();

  const [text, setText] = useState();
  const [quiz, setQuiz] = useState([
    { question: "What", choices: ["a", "b", "c"], answer_key: "a" },
    { question: "Why", choices: ["1", "2", "3"], answer_key: "b" },
    { question: "How", choices: ["x", "y", "z"], answer_key: "c" },
  ]);

  const [answers, setAnswers] = useState([]);
  const updateAnswers = (itemIndex, answer) => {
    setAnswers((existingAnswers) => {
      return [
        ...existingAnswers.slice(0, itemIndex),
        answer,
        ...existingAnswers.slice(itemIndex + 1),
      ];
    });
  };

  const [testType, setTestType] = useState();
  const [title, setTitle] = useState();

  const getPassage = async () => {
    const passageRef = collection(db, "passage");

    // TODO: Change id to dynamic passageID
    const passageQuery = query(passageRef, where("id", "==", 1243));

    const passageQuerySnapshot = await getDocs(passageQuery);

    passageQuerySnapshot.forEach((doc) => {
      let passage = doc.data();
      setTitle(passage.title);
      setQuiz(passage.quiz);
      setText(passage.text);
    });
  };

  const evaluateOverallReadingProfile = () => {
    // Set comprehension profile
    const comprehensionScorePercentage =
      Math.round(
        sessionStorage.getItem("quiz_score") /
          sessionStorage.getItem("total_quiz_items")
      ) * 100;

    let comprehensionProfile = "";
    if (comprehensionScorePercentage >= 80) {
      comprehensionProfile = "Independent";
    } else if (
      comprehensionScorePercentage >= 59 &&
      comprehensionScorePercentage <= 79
    ) {
      comprehensionProfile = "Instructional";
    } else {
      comprehensionProfile = "Frustation";
    }

    // Set reading profile
    const totalWords = 75;
    // const totalWords = text.split().length; // TODO: test with text
    const numberOfMiscues = 3; // TODO: compute miscues
    const readingScorePercentage =
      Math.round((totalWords - numberOfMiscues) / totalWords) * 100;

    let readingProfile = "";
    if (readingScorePercentage >= 97) {
      readingProfile = "Independent";
    } else if (readingScorePercentage >= 90 && readingScorePercentage <= 96) {
      readingProfile = "Instructional";
    } else {
      readingProfile = "Frustation";
    }

    // Set overalll reading profile
    let overallReadingProfile = "";
    if (
      readingProfile === "Independent" &&
      comprehensionProfile === "Independent"
    ) {
      overallReadingProfile = "Independent";
    } else if (
      readingProfile === "Independent" &&
      comprehensionProfile === "Instructional"
    ) {
      overallReadingProfile = "Instructional";
    } else if (
      readingProfile === "Instructional" &&
      comprehensionProfile === "Independent"
    ) {
      overallReadingProfile = "Instructional";
    } else if (
      readingProfile === "Frustation" &&
      comprehensionProfile === "Instructional"
    ) {
      overallReadingProfile = "Frustation";
    } else {
      overallReadingProfile = "Frustation";
    }
    return overallReadingProfile;
  };

  const addPretestFile = async () => {
    try {
      // TODO: Modify db to write on: pre=test or post
      const docRef = await addDoc(collection(db, "pre-test"), {
        passage_title: title,
        student_id: sessionStorage.getItem("student_id"),
        reading_speed: 0,
        quiz_score: sessionStorage.getItem("quiz_score"),
        number_of_miscues: 3,
        reading_score_percentage:
          Math.round((totalWords - numberOfMiscues) / totalWords) * 100,
        comprehension_score_percentage:
          Math.round(
            sessionStorage.getItem("quiz_score") /
              sessionStorage.getItem("total_quiz_items")
          ) * 100,
        oral_reading_profile: evaluateOverallReadingProfile(),
        teacher_id: "",
        date_taken: new Date(),

        id: "",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const checkQuizAnswers = () => {
    const answerKeys = quiz.map((item) => item.answer_key);

    // TODO: Check that answers are complete ?
    console.log("Answer Keys: ", answerKeys);
    console.log("Answers:", answers);

    // Compare answers and compute score
    let totalQuizItems = answerKeys.length;
    let quizScore = 0;

    for (let i = 0; i < totalQuizItems; i++) {
      if (answers[i] === answerKeys[i]) {
        quizScore += 1;
      }
    }

    console.log("Quiz core", quizScore);
    sessionStorage.setItem("quiz_score", quizScore);
    sessionStorage.setItem("total_quiz_items", totalQuizItems);

    // TODO: Save answers and score to database
    addPretestFile();

    return;
  };
  // useLayoutEffect(() => {
  //   getPassageQuiz();
  // });
  useEffect(() => {
    getPassage();
  }, []);

  return (
    <div className="flex flex-col p-12 md:px-16 pt-8 gap-2 my-4">
      {/* Back button */}
      {/* <BackButton /> */}

      <div className="flex flex-col text-center gap-2 p-2 mx-4 md:mx-12 lg:mx-40 border-b-4 border-coraBlue-1">
        <h2 className="text-3xl font-bold">{testType} Quiz</h2>
        <p className="text-lg">{title}</p>
      </div>

      {/* Questions */}
      <div className="flex flex-col mx-4 md:mx-12 lg:mx-40 mb-8 my-4">
        <div className="flex flex-col gap-4">
          {quiz.map((item, index) => {
            return (
              // Single question
              <div className="flex flex-col bg-gray-100 rounded-lg p-6">
                <p className="text-xl font-bold">
                  {index + 1}. {item.question}
                </p>
                {/* {(choices = item.choices)} */}
                <div className="flex flex-col gap-2">
                  {item.choices.map((choice) => {
                    return (
                      <div class="flex items-center mt-4 ">
                        <input
                          required
                          checked={answers[index] === choice}
                          type="radio"
                          value={choice}
                          onChange={() => {
                            updateAnswers(index, choice);
                            console.log("Answers: ", answers);
                          }}
                          className="w-4 h-4 text-blue-600
                          cursor-pointer"
                        />
                        <label class="ml-2 text-xl">{choice}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit button */}
      <div className="flex flex-col items-center mt-4">
        {/* <Link href="/student/dashboard"> */}
        <button
          className="bg-coraBlue-1 py-4 px-24 text-coraWhite text-xl font-bold rounded-lg hover:bg-cyan-700"
          onClick={() => {
            console.log("Answers", answers);
            console.log("Stuent ID", sessionStorage.getItem("student_id"));
            console.log(sessionStorage.getItem("passage_id"));
            checkQuizAnswers();
          }}
        >
          SUBMIT
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
}
