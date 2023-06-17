import React, { useState, useEffect } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import BackButton from "@/components/BackButton";
import { useAuth } from "@/context/AuthContext";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDoc,
  doc,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";

export default function classDetails() {
  const router = useRouter();

  const [gradeLevel, setGradeLevel] = useState(0);
  const [sectionName, setSectionName] = useState("");
  const [teacherID, setTeacherID] = useState();

  const [totalStudents, setTotalStudents] = useState(0);
  const [sectionStudents, setSectionStudents] = useState([]);

  const [schoolName, setSchoolName] = useState("");
  const [region, setRegion] = useState("");

  const [pretestProfileCounts, setPretestProfileCounts] = useState({
    frustation: 0,
    instructional: 0,
    independent: 0,
  });

  const [posttestProfileCounts, setPosttestProfileCounts] = useState({
    frustation: 0,
    instructional: 0,
    independent: 0,
  });

  const countTestProfiles = () => {
    let pretestFrustation = 0;
    let pretestInstructional = 0;
    let pretestIndependent = 0;

    sectionStudents.map((s) => {
      let student = s.data();
      console.log("Student", student);
      switch (student.pretestProfile) {
        case "Frustration":
          pretestFrustation += 1;
          break;
        case "Instructional":
          pretestInstructional += 1;
          break;
        case "Independent":
          pretestIndependent += 1;
        default:
          break;
      }
    });

    setPretestProfileCounts({
      frustation: pretestFrustation,
      instructional: pretestInstructional,
      independent: pretestIndependent,
    });

    let posttestFrustation = 0;
    let posttestInstructional = 0;
    let posttestIndependent = 0;

    sectionStudents.map((s) => {
      let student = s.data();
      switch (student.posttestProfile) {
        case "Frustration":
          posttestFrustation += 1;
          break;
        case "Instructional":
          posttestInstructional += 1;
          break;
        case "Independent":
          posttestIndependent += 1;
        default:
          break;
      }
    });

    setPosttestProfileCounts({
      frustation: posttestFrustation,
      instructional: posttestInstructional,
      independent: posttestIndependent,
    });
  };

  const getSectionStudents = async () => {
    console.log(sessionStorage.getItem("section_id"));
    const studentsRef = collection(db, "students");
    const studentsQuery = query(
      studentsRef,
      where("section_id", "==", sessionStorage.getItem("section_id")),
      orderBy("last_name")
    );

    const studentsSnap = await getDocs(studentsQuery);

    if (studentsSnap) {
      setSectionStudents(studentsSnap.docs);
      console.log(sectionStudents);
      countTestProfiles();
    }
  };

  // Call when rendered
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser === null) {
      router.push("/");
      return;
    }
    setGradeLevel(sessionStorage.getItem("sec_grade_level"));
    setSectionName(sessionStorage.getItem("sec_name"));
    setRegion(sessionStorage.getItem("school_region"));
    setSchoolName(sessionStorage.getItem("school_name"));
    setTotalStudents(sessionStorage.getItem("total_students"));

    getSectionStudents();
  }, []);

  useEffect(() => {
    countTestProfiles(); // Do when sectionStudents data change
  }, [sectionStudents]);

  return (
    <div className="p-24 pt-8">
      {/* Back button */}
      <div className="flex justify-between">
        <BackButton />
        <div className="flex justify-between gap-4">
          {" "}
          <button
            className="p-2 px-8 rounded font-bold bg-gray-500 text-white self-end"
            onClick={() => {
              sessionStorage.setItem("sec_name", sectionName);
              sessionStorage.setItem("grade_level", gradeLevel);
              router.push("/admin/editSection");
            }}
          >
            Edit section
          </button>
          <button
            className="p-2 px-8 rounded font-bold bg-coraBlue-1 text-white self-end"
            onClick={() => {
              sessionStorage.setItem("sec_name", sectionName);
              sessionStorage.setItem("grade_level", gradeLevel);
              router.push("/admin/addStudent");
            }}
          >
            Add student
          </button>
        </div>
      </div>

      <div className="flex justify-center my-6">
        <p className="font-bold text-3xl">
          Grade {gradeLevel} - {sectionName}
        </p>
      </div>

      {/* ------------------List of Students */}
      <div className="flex flex-col justify-between mt-12">
        <div className="flex flex-1 ">
          <table class="mt-4 md:mx-32 mx-0 table-fixed w-full text-md text-left">
            <thead>
              <tr className="border-b-4 border-black">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>ID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sectionStudents.map((s, idx) => {
                let student = s.data();
                return (
                  <tr>
                    <td>{idx + 1}</td>
                    <td className="break-words">
                      {student.last_name +
                        ", " +
                        student.first_name +
                        " " +
                        student.middle_name}
                    </td>
                    <td className="break-words">{student.email}</td>
                    <td className="break-words">{student.id}</td>

                    <td className="text-center">
                      <button
                        className="underline"
                        onClick={() => {
                          sessionStorage.setItem("student_ref_id", student.id);
                          router.push("/admin/studentProfile");
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
