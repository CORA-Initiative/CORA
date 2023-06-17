import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  getDoc,
  query,
  doc,
  addDoc,
  updateDoc,
  collection,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import BackButton from "@/components/BackButton";

export default function AddStudents() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState();
  const [email, setEmail] = useState();
  const [sectionName, setSectionName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");

  const [schoolID, setSchoolID] = useState("");
  const [sectionID, setSectionID] = useState("");
  const [teacherID, setTeacherID] = useState("");

  const [allSectionNames, setAllSectionNames] = useState([]);

  const registerStudent = async () => {
    const encryptedPassword = "";
    const docRef = await addDoc(collection(db, "students"), {
      email: email,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      grade_level: Number(gradeLevel),
      sex: sex,
      password: encryptedPassword,
      posttestProfile: "",
      pretestProfile: "",
      school_id: schoolID,
      section_id: sectionID,
      teacher_id: teacherID,
    });
    console.log("Document written with ID: ", docRef.id);

    const toUpdate = doc(db, "students", docRef.id);
    await updateDoc(toUpdate, { id: docRef.id });
  };

  useEffect(() => {
    setSectionName(sessionStorage.getItem("sec_name"));
    console.log("addStudent secname: ", sessionStorage.getItem("sec_name"));
    setGradeLevel(sessionStorage.getItem("grade_level"));
  });
  return (
    <div className="p-14 py-10 flex flex-col">
      <BackButton></BackButton>
      <div className="flex flex-col p-8 gap-8 border-4 border-coraBlue-4 rounded-md mx-20 md:mx-80 my-8">
        <p className="font-bold text-xl text-center uppercase">Add Teacher</p>
        {/* Name */}
        <div className="grid grid-cols-3 gap-8">
          <div className="flex flex-col gap-1">
            <label className="font-bold">First Name</label>
            <input
              className="col-span-1 border-2 rounded border-coraBlue-2 h-10 p-2"
              type="text"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold">Middle Name</label>
            <input
              className="col-span-1 border-2 rounded border-coraBlue-2 h-10 p-2"
              type="text"
              onChange={(e) => {
                setMiddleName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold">Last Name</label>
            <input
              className="col-span-1 border-2 rounded border-coraBlue-2 h-10 p-2"
              type="text"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col gap-1">
            <label className="font-bold">Sex</label>
            <select
              className="border-2 rounded border-coraBlue-2 w-40 h-10 p-2"
              value={sex}
              onChange={(e) => {
                setSex(e.target.value);
              }}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold">Email</label>
            <input
              className="col-span-1 border-2 rounded border-coraBlue-2 h-10 p-2"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <button className="mt-4 px-8 py-4 rounded-md bg-coraBlue-1 text-white font-bold w-60 self-center">
        Add teacher
      </button>
    </div>
  );
}
