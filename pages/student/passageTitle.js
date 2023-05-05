import React, { useEffect, useLayoutEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import { thisUser } from "@/context/UserContext";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function passageTitle({}) {
  const user = thisUser();
  const [testType, setTestType] = useState();
  const [title, setTitle] = useState();
  const [instruction, setInstruction] = useState();

  const fetchPassage = async () => {
    console.log("In fetch passage");
    // TODO: fetch passage
    // TODO: get ID of the passage, and set as one of the tokens
    // params: grade level, testtype

    console.log(sessionStorage.getItem("grade_level"), testType);
    const passageRef = collection(db, "passage"); // Create a reference to the cities collection
    const passageQuery = query(
      passageRef,
      where(
        "grade_level",
        "==",
        Number(sessionStorage.getItem("grade_level")),
        where("type", "==", testType)
      )
    );

    const passageQuerySnapshot = await getDocs(passageQuery);

    passageQuerySnapshot.forEach((doc) => {
      let passage = doc.data();
      console.log("Passage", passage);
      setTitle(passage.title);
      setInstruction(passage.instruction);
      sessionStorage.setItem("passage_id", passage.id);
      console.log("Passage ID", sessionStorage.getItem("passage_id"));
    });
  };

  useLayoutEffect(() => {
    fetchPassage();
  });
  useEffect(() => {
    user.isPretestEnabled ? setTestType("Pre-test") : setTestType("Post-test");
    fetchPassage();
  }, testType);

  return (
    <div className="p-12 md:px-16 pt-8">
      {/* Back button */}
      <BackButton />
      {/* Main Content */}
      <div className="flex flex-col gap-24 items-center p-12 px-40 text-center">
        <div className="flex flex-col font-bold text-xl items-center">
          {/* TODO: test type should reflect what is taken */}
          <p>Oral Reading {testType}</p>
          <p>Grade {sessionStorage.getItem("grade_level")}</p>
        </div>
        <h1 className="font-bold text-8xl">{title}</h1>
        <p className="text-lg">{instruction}</p>
        <Link href="/student/passageReading">
          <button className="p-4 px-32 bg-coraBlue-1 rounded-lg text-coraWhite text-xl uppercase font-bold">
            Start Reading
          </button>
        </Link>
      </div>
    </div>
  );
}
