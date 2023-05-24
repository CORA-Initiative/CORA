import React, { useEffect, useState } from "react";
import { thisUser } from "@/context/UserContext";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export default function takeQuiz({}) {
  const { currentUser } = useAuth();

  const router = useRouter();
  const [text, setText] = useState();
  const [quiz, setQuiz] = useState([
    { question: "What", choices: ["a", "b", "c"], answer_key: "a" },
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

  const [title, setTitle] = useState();

  const getPassage = async () => {
    // console.log("Passage ID", sessionStorage.getItem("passage_id"));
    const passageRef = doc(db, "passage", sessionStorage.getItem("passage_id"));
    const passageSnap = await getDoc(passageRef);

    if (passageSnap.exists()) {
      let passage = passageSnap.data();

      setTitle(passage.title);
      setQuiz(passage.quiz);
      setText(passage.text);
    } else {
      console.log("Failed to fetch passage.");
    }
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

  const addTestResultsToDatabase = async (collection_name = "") => {
    try {
      const docRef = await addDoc(collection(db, collection_name), {
        passage_title: title,
        passage_id: sessionStorage.getItem("passage_id"),
        student_id: sessionStorage.getItem("student_id"),
        reading_speed: Number(sessionStorage.getItem("reading_speed")),
        quiz_score: Number(sessionStorage.getItem("quiz_score")),
        quiz_total: Number(sessionStorage.getItem("total_quiz_items")),
        number_of_miscues: Number(sessionStorage.getItem("number_of_miscues")),
        reading_score_percentage:
          ((sessionStorage.getItem("total_words") -
            sessionStorage.getItem("number_of_miscues")) /
            sessionStorage.getItem("total_words")) *
          100,
        comprehension_score_percentage:
          (sessionStorage.getItem("quiz_score") /
            sessionStorage.getItem("total_quiz_items")) *
          100,
        oral_reading_profile: evaluateOverallReadingProfile(),
        handler_id: sessionStorage.getItem("handler_id"),
        date_taken: new Date(),
        answers: answers,
        school_year: sessionStorage.getItem("school_year"),
        section_id: sessionStorage.getItem("student_sec_id"),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Check quiz answers
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

    console.log("Quiz score", quizScore);
    sessionStorage.setItem("quiz_score", quizScore);
    sessionStorage.setItem("total_quiz_items", totalQuizItems);

    // TODO: Save answers and score to database
    let c_name = "";
    if (sessionStorage.getItem("test_type") == "Pre-test") {
      c_name = "pre-test";
    } else {
      c_name = "post-test";
    }

    addTestResultsToDatabase(c_name);

    return;
  };

  useEffect(() => {
    getPassage();

    // TODO
    sessionStorage.setItem("number_of_miscues", 0);
    sessionStorage.setItem("reading_speed", 0);
    sessionStorage.setItem("total_words", 0);
  }, []);

  useEffect(() => {
    console.log("currentUser", currentUser);
    if (!sessionStorage.getItem("student_ref_id")) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex flex-col p-12 md:px-16 pt-8 gap-2 my-4">
      <div className="flex flex-col text-center gap-2 p-2 mx-4 md:mx-12 lg:mx-40 border-b-4 border-coraBlue-1">
        <h2 className="text-3xl font-bold">
          {sessionStorage.getItem("test_type")} Quiz
        </h2>
        <p className="text-lg">{title}</p>
      </div>

      {/* Questions */}
      <div className="flex flex-col mx-4 md:mx-12 lg:mx-40 mb-8 my-4">
        <div className="flex flex-col gap-4">
          {quiz.map((item, index) => {
            return (
              // Single question
              <div className="flex flex-col bg-gray-100 rounded-lg p-6 border-b-4">
                <p className="text-xl font-bold">
                  {index + 1}. {item.question}
                </p>

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
            router.push("/student/quizResults");
          }}
        >
          SUBMIT
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
}
