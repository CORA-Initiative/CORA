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
import { useAuth } from "../../context/AuthContext";
import * as CryptoJS from "crypto-js";

import { toast } from "react-toastify";

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

  const { login, signup, currentUser, logout } = useAuth();

  const getSectionsData = async () => {
    const sectionsRef = collection(db, "section");
    // Get sections handled by teacher by grade level
    const sectionsQuery = query(
      sectionsRef,
      where("school_id", "==", sessionStorage.getItem("school_ref_id")),
      orderBy("grade_level")
    );
    const sectionsSnap = await getDocs(sectionsQuery);

    if (sectionsSnap) {
      sectionsSnap.docs.forEach((sec, index) => {
        if (Number(sec.grade_level) === Number(gradeLevel)) {
          setAllSectionNames((existingSections) => [
            ...existingSections.slice(0, index),
            sec.data().name,
            ...existingSections.slice(index + 1),
          ]);
        }
      });
    } else {
      console.log("No section document found.");
    }
  };

  const getSectionIDAndTeacherID = async (
    schoolID,
    gradeLevel,
    sectionName
  ) => {
    // Find section
    // TODO: Get section ID and Teacher ID
    const sectionsRef = collection(db, "section");
    // Get sections handled by teacher by grade level
    const sectionsQuery = query(
      sectionsRef,
      where("school_id", "==", schoolID),
      where("grade_level", "==", gradeLevel),
      where("name", "==", sectionName)
    );
    const sectionsSnap = await getDocs(sectionsQuery);

    sectionsSnap.docs.forEach((sec, index) => {});
  };

  const encryptText = (text, pass) => {
    console.log("To encrypt", text, pass);
    const cipherText = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      pass
    ).toString();

    return cipherText;
  };
  const decryptText = (text, pass) => {
    console.log("To decrypt", text, pass);

    const bytes = CryptoJS.AES.decrypt(text, pass);
    const plainText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return plainText;
  };

  const addStudentToDatabase = async (email, password) => {
    const encryptedPassword = encryptText(
      password,
      process.env.NEXT_PUBLIC_CRYPTO_SECRET_PASS
    );
    console.log("Encrypted Pass: ", encryptedPassword);
    const docRef = await addDoc(collection(db, "students"), {
      email: email,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      grade_level: Number(gradeLevel),
      sex: sex.toLowerCase(),
      password: encryptedPassword,
      posttestProfile: "",
      pretestProfile: "",
      school_id: sessionStorage.getItem("school_ref_id"),
      section_id: sessionStorage.getItem("section_id"),
      teacher_id: sessionStorage.getItem("assigned_teacher"),
    });
    console.log("Document written with ID: ", docRef.id);
    const toUpdate = doc(db, "students", docRef.id);
    await updateDoc(toUpdate, { id: docRef.id });

    toast.success("Student added to database.");
  };

  const registerStudent = async () => {
    // Signup user: email, password
    // Generate Password
    const d = new Date();
    let year = d.getFullYear();
    const generatedPassword =
      firstName.charAt(0).toLowerCase() +
      middleName.charAt(0).toLocaleLowerCase() +
      lastName.toLowerCase() +
      year.toString();

    try {
      const credentials = await signup(email, generatedPassword);
      addStudentToDatabase(email, generatedPassword);
    } catch {
      toast.error("Email already used.");
      return;
    }
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
        <p className="font-bold text-xl text-center uppercase">Add Student</p>
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
        <div className="grid grid-cols-3 gap-8">
          <div className="flex flex-col gap-1">
            <label className="font-bold">Grade Level</label>
            <select
              className="border-2 rounded border-coraBlue-2 w-40 h-10 p-2"
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
          <div className="flex flex-col gap-1 w-40">
            <label className="font-bold">Section</label>
            <select
              className="border-2 rounded border-coraBlue-2 w-40 h-10 p-2"
              value={sessionStorage.getItem("sec_name")}
              onChange={(e) => {
                setSectionName(e.target.value);
              }}
            >
              <option value={sessionStorage.getItem("sec_name")}>
                {sessionStorage.getItem("sec_name")}
              </option>
              ;
            </select>
          </div>
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
      <button
        disabled={
          firstName === "" ||
          middleName === "" ||
          lastName === "" ||
          email === ""
        }
        onClick={registerStudent}
        className="mt-4 px-8 py-4 rounded-md bg-coraBlue-1 text-white font-bold w-60 self-center disabled:bg-gray-500"
      >
        Add Student
      </button>
    </div>
  );
}
