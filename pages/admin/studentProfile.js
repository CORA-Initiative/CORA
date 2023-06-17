import React, { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import { useAuth } from "@/context/AuthContext";
import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";

export default function studentProfile() {
  const [student, setStudent] = useState({});

  const getStudentData = async () => {
    const studentRef = doc(
      db,
      "students",
      sessionStorage.getItem("student_ref_id")
    );
    const studentSnap = await getDoc(studentRef);

    if (studentSnap.exists()) {
      let s = studentSnap.data();

      setStudent(s);
    } else {
      console.log("Failed to fetch student.");
    }
  };

  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <div className="flex flex-col p-14 py-8 gap-8">
      <BackButton></BackButton>

      <div>
        <p className="text-2xl font-bold">Student Data</p>
      </div>
      <div className="grid grid-cols-4 md:w-1/2 gap-8">
        <label className="font-bold">First name</label>
        <input
          className="col-span-3 border-2 border-coraBlue-1 p-2 rounded"
          value={student.first_name}
        />
        <label className="font-bold">Middle name</label>
        <input
          className=" col-span-3 border-2 border-coraBlue-1 p-2 rounded"
          value={student.middle_name}
        />
        <label className="font-bold">Last name</label>
        <input
          className="col-span-3 border-2 border-coraBlue-1 p-2 rounded"
          value={student.last_name}
        />
      </div>

      <div className="grid grid-cols-4 md:w-1/2 gap-8">
        <label className="font-bold">Sex</label>
        <input
          className="col-span-3 border-2 border-coraBlue-1 p-2 rounded"
          value={student.sex}
        />
        <label className="font-bold">Grade Level</label>
        <input
          className="col-span-3 border-2 border-coraBlue-1 p-2 rounded"
          value={student.grade_level}
          type="number"
        />
        <label className="font-bold">Section</label>
        <input
          className=" col-span-3 border-2 border-coraBlue-1 p-2 rounded"
          value={sessionStorage.getItem("sec_name")}
        />
        <label className="font-bold">Email</label>
        <input
          className=" col-span-3 border-2 border-coraBlue-1 p-2 rounded"
          value={student.email}
        />
      </div>

      <div className="flex flex-row justify-end gap-12 md:w-1/2">
        <button className="p-2 px-8 rounded font-bold bg-red-500 text-white">
          Remove student
        </button>
        <button className="p-2 px-8 rounded font-bold bg-coraBlue-1 text-white ">
          Update student
        </button>
      </div>
    </div>
  );
}
