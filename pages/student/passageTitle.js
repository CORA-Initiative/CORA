import React, { useEffect, useLayoutEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import { thisUser } from "@/context/UserContext";
import { db } from "../../firebase";
import { collection, query, where, getDocs, and } from "firebase/firestore";

export default function passageTitle({}) {
  const [title, setTitle] = useState();
  const [instruction, setInstruction] = useState();

  const fetchPassage = async () => {
    console.log(">>> fetchPassage()");
    // TODO: get ID of the passage, and set as one of the tokens
    // params: grade level, testtype

    console.log(sessionStorage.getItem("grade_level"));
    console.log(sessionStorage.getItem("test_type"));

    const passageRef = collection(db, "passage");
    const passageQuery = query(
      passageRef,
      where("grade_level", "==", Number(sessionStorage.getItem("grade_level"))),
      where("type", "==", sessionStorage.getItem("test_type"))
    );

    const passageQuerySnapshot = await getDocs(passageQuery);

    console.log("Fetched passages: ", passageQuerySnapshot.docs);

    passageQuerySnapshot.forEach((doc) => {
      let passage = doc.data();
      console.log(passage);

      setTitle(passage.title);
      setInstruction(passage.instruction);
      sessionStorage.setItem("passage_id", doc.id);
      console.log("Passage ID", sessionStorage.getItem("passage_id"));
    });
  };

  useEffect(() => {
    fetchPassage();
  });

  return (
    <div className="p-12 md:px-16 pt-8">
      {/* Back button */}
      <BackButton />
      {/* Main Content */}
      <div className="flex flex-col gap-24 items-center p-12 px-40 text-center">
        <div className="flex flex-col font-bold text-xl items-center">
          {/* TODO: test type should reflect what is taken */}
          <p>Oral Reading {sessionStorage.getItem("test_type")}</p>
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
