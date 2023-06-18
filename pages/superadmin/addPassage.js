import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { getDoc, doc, addDoc, updateDoc, collection } from "firebase/firestore";

export default function addPassage() {
  const [gradeLevel, setGradeLevel] = useState("");
  const [id, setID] = useState("");
  const [instruction, setInstruction] = useState("");
  const [language, setLanguage] = useState("English");
  const [setCategory, setSetCategory] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Pre-test");
  const [quiz, setQuiz] = useState([]);

  const encryptText = (text, pass) => {
    console.log("To encrypt", text, pass);
    const cipherText = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      pass
    ).toString();

    return cipherText;
  };

  const uploadPassage = async () => {
    const docRef = await addDoc(collection(db, "passage"), {
      title: "",
      text: "",
      instruction: "",
      language: "English",
      grade_level: 0,
      id: "",
      set_category: "A",
      type: "Post test",
      quiz: [{ question: "", choices: ["a"], answer_key: "" }],

      // enter other info here except password; passwords can't be retrieved
    });
    console.log("Document written with ID: ", docRef.id);

    const toUpdate = doc(db, "passage", docRef.id);
    await updateDoc(toUpdate, { id: docRef.id });
  };

  useEffect(() => {
    console.log(title);
    console.log(gradeLevel);
    console.log(type);
    console.log(language);
    console.log(setCategory);
    console.log(text);
  });
  return (
    <div>
      <div className="flex flex-col p-2 border-4 border-coraBlue-2 gap-4">
        <p className="font-bold text-xl">Add a Passage</p>
        {/* Title */}
        <div className="flex flex-row gap-4">
          <label>Title:</label>
          <input
            className="outline border-blue-500"
            type="text"
            placeholder=""
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        {/* Instruction */}
        <div className="flex flex-row gap-4">
          <label>Instruction:</label>
          <input
            className="outline border-blue-500"
            type="text"
            placeholder=""
            onChange={(e) => setInstruction(e.target.value)}
          ></input>
        </div>
        {/* Text*/}
        <div className="flex flex-row gap-4">
          <label>Text:</label>
          <textarea
            className="outline"
            name="postContent"
            rows={4}
            cols={80}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        {/* Grade Level */}
        <div className="flex flex-row gap-4">
          <label className="">Grade Level:</label>
          <select
            value={gradeLevel}
            onChange={(e) => {
              setGradeLevel(e.target.value);
            }}
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
        {/* Type */}
        <div className="flex flex-row gap-4">
          <label className="">Type:</label>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="Pre-test">Pre-test</option>
            <option value="Post test">Post test</option>
          </select>
        </div>
        {/* Language */}
        <div className="flex flex-row gap-4">
          <label className="">Language:</label>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
          >
            <option value="English">English</option>
          </select>
        </div>
        {/* Set Category */}
        <div className="flex flex-row gap-4">
          <label className="">Set Category:</label>
          <select
            value={setCategory}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="A">A</option>
          </select>
        </div>
        <button onClick={uploadPassage}>ADD TEMPLATE PASSAGE</button>
      </div>
    </div>
  );
}
