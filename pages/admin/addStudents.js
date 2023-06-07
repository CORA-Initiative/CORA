import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { getDoc, doc, addDoc, updateDoc, collection } from "firebase/firestore";

export default function addStudents() {
  const registerStudent = async () => {
    const docRef = await addDoc(collection(db, "students"), {
      email: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      grade_level: Number(0),
      sex: "male",
      password: "",
      posttestProfile: "",
      pretestProfile: "",
      school_id: "7JXyZdsNR7hToU0suKBe",
      section_id: "",
      teacher_id: "HTn1xn7Xw6W7nvcsHhgV",
    });
    console.log("Document written with ID: ", docRef.id);

    const toUpdate = doc(db, "students", docRef.id);
    await updateDoc(toUpdate, { id: docRef.id });
  };

  return (
    <div>
      <button onClick={registerStudent}>Add student</button>
    </div>
  );
}
