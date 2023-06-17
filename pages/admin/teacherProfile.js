import React, { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import { useAuth } from "@/context/AuthContext";
import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";

export default function teacherProfile() {
  const [teacher, setTeacher] = useState({});

  const getTeacherData = async () => {
    const teacherRef = doc(
      db,
      "teachers",
      sessionStorage.getItem("teacher_ref_id")
    );
    const teacherSnap = await getDoc(teacherRef);

    if (teacherSnap.exists()) {
      let t = teacherSnap.data();

      setTeacher(t);
    } else {
      console.log("Failed to fetch teacher.");
    }
  };

  useEffect(() => {
    getTeacherData();
  }, []);

  return (
    <div className="flex flex-col p-14 py-8 gap-8">
      <BackButton></BackButton>

      <div>
        <p className="text-2xl font-bold">Teacher Data</p>
      </div>
      <div className="grid grid-cols-4 md:w-1/2 gap-8">
        <label className="font-bold">First name</label>
        <input
          className="col-span-3 border-2 border-coraBlue-1 p-2 rounded"
          value={teacher.first_name}
        />
        <label className="font-bold">Middle name</label>
        <input
          className=" col-span-3 border-2 border-coraBlue-1 p-2 rounded"
          value={teacher.middle_name}
        />
        <label className="font-bold">Last name</label>
        <input
          className="col-span-3 border-2 border-coraBlue-1 p-2 rounded"
          value={teacher.last_name}
        />
      </div>

      <div className="grid grid-cols-4 md:w-1/2 gap-8">
        <label className="font-bold">Sex</label>
        <input
          className="col-span-3 border-2 border-coraBlue-1 p-2 rounded"
          value={teacher.sex}
        />

        <label className="font-bold">Email</label>
        <input
          className=" col-span-3 border-2 border-coraBlue-1 p-2 rounded"
          value={teacher.email}
        />
      </div>

      <div className="flex flex-row justify-end gap-12 md:w-1/2">
        <button className="p-2 px-8 rounded font-bold bg-red-500 text-white">
          Remove teacher
        </button>
        <button className="p-2 px-8 rounded font-bold bg-coraBlue-1 text-white ">
          Update teacher
        </button>
      </div>
    </div>
  );
}
