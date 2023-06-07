import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { getDoc, doc, addDoc } from "firebase/firestore";

export default function AddQuiz({ setPassageQuiz }) {
  const [quizItems, setQuizItems] = useState(0);
  const [quiz, setQuiz] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const [items, setItems] = useState();

  useEffect(() => {
    for (let i = 0; i < quizItems; i++) {
      setQuiz((items) => [
        ...items,
        { question: "", choices: [], answer_key: "" },
      ]);
    }

    setItems(
      quiz.map((item, index) => {
        return (
          <div className="flex flex-row gap-4">
            <label>Item {index + 1}:</label>
            <input
              className="outline border-blue-500"
              type="text"
              placeholder=""
              onChange={(e) => setQuizItems(e.target.value)}
            ></input>
          </div>
        );
      })
    );
  }, [isLocked]);

  return (
    <div>
      <div className="flex flex-row gap-4">
        <label>Number of Quiz Items:</label>
        <input
          className="outline border-blue-500"
          type="number"
          placeholder=""
          onChange={(e) => {
            setQuizItems(Number(e.target.value));
          }}
        ></input>
        <button
          className="bg-gray-400"
          onSubmit={(e) => {
            uploadPassage();
          }}
        >
          Set number of items
        </button>
      </div>
      <p>Quiz Items</p>
      {items}
    </div>
  );
}
