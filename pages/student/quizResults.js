import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function quizResults({}) {
  const [testType, setTestType] = useState("");
  const [passageTitle, setPassageTitle] = useState();
  const [score, setScore] = useState();
  const [totalQuizItems, setTotalQuizItems] = useState();

  useEffect(() => {
    if (
      sessionStorage.getItem("quiz_score") &&
      sessionStorage.getItem("total_quiz_items")
    ) {
      setScore(sessionStorage.getItem("quiz_score"));
      setTotalQuizItems(sessionStorage.getItem("total_quiz_items"));
    } else {
      setScore(0);
      setTotalQuizItems(0);
    }

    setTestType(sessionStorage.getItem("test_type"));
    setPassageTitle(sessionStorage.getItem("passage_title"));
  }, []);

  return (
    <div className="flex flex-col p-12 md:px-16 pt-8 gap-6">
      <div className="flex flex-col gap-24">
        <div className="flex flex-col text-center gap-2">
          <h2 className="text-3xl font-bold">
            {sessionStorage.getItem("test_type")} Quiz Results
          </h2>
          <p className="text-lg">{passageTitle}</p>
        </div>

        <div className="text-center text-gray-800">
          <p className="text-xl">You completed the {testType} Quiz!</p>
          <p className="text-lg">You got</p>
        </div>

        <div className="text-center flex flex-col gap-4">
          <h1 className="font-bold text-6xl">
            {score}/{totalQuizItems}
          </h1>
        </div>

        <div className="flex flex-col items-center mt-4">
          <Link href="/student/dashboard">
            <button className="bg-coraBlue-1 py-4 px-20 text-coraWhite text-xl font-bold rounded-lg hover:bg-cyan-700">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
