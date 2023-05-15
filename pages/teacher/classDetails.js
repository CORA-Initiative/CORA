import React, { useState, useEffect } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import BackButton from "@/components/BackButton";
import Link from "next/link";
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
        case "Frustation":
          pretestFrustation += 1;
          break;
        case "Instructional":
          pretestInstructional += 1;
          break;
        default:
          pretestIndependent += 1;
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
        case "Frustation":
          posttestFrustation += 1;
          break;
        case "Instructional":
          posttestInstructional += 1;
          break;
        default:
          posttestIndependent += 1;
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
  useEffect(() => {
    setGradeLevel(sessionStorage.getItem("sec_grade_level"));
    setSectionName(sessionStorage.getItem("sec_name"));
    setTeacherID(sessionStorage.getItem("teacher_id"));
    setRegion(sessionStorage.getItem("school_region"));
    setSchoolName(sessionStorage.getItem("school_name"));
    setTotalStudents(sessionStorage.getItem("total_students"));

    getSectionStudents();
  }, []);

  // Call when sectionStudents data change
  useEffect(() => {
    countTestProfiles();
  }, [sectionStudents]);

  return (
    <div className="p-24 pt-8">
      {/* Back button */}
      <BackButton />
      <div className="flex justify-center my-6">
        <p className="font-bold text-3xl">
          Grade {gradeLevel} - {sectionName}
        </p>
      </div>
      {/* Results and other info */}
      <div className="mt-4 flex lg:w-2/3 flex-col md:flex-row  gap-8">
        {/* Results Summary*/}
        <div className="flex flex-col border-blue-600 gap-4">
          <p className="text-2xl font-bold text-coraBlue-1">Results Summary</p>
          <table class="table-fixed w-full text-left">
            <thead>
              <tr className="border-b-4 border-black text-lg">
                <th className="border-r-2 border-black">Profile Level</th>
                <th className="text-orange-500 px-2">Pre-test</th>
                <th className="text-orange-500">Post test</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-r-2 border-black">Frustation</td>
                <td className="px-2">{pretestProfileCounts.frustation}</td>
                <td>{posttestProfileCounts.frustation}</td>
              </tr>
              <tr>
                <td className="border-r-2 border-black">Instructional</td>
                <td className="px-2">{pretestProfileCounts.instructional}</td>
                <td>{posttestProfileCounts.instructional}</td>
              </tr>
              <tr>
                <td className="border-r-2 border-black">Independent</td>
                <td className="px-2">{pretestProfileCounts.independent}</td>
                <td>{posttestProfileCounts.independent}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* --------------------- Section Information */}
      <div class="flex flex-col w-full mt-8 lg:w-2/3 gap-4">
        <p class="font-bold text-2xl text-coraBlue-1">Section Information</p>
        <div className="flex flex-row gap-10">
          {/* --------------------------2nd column */}
          <div className="flex flex-col w-1/2">
            <div className="flex justify-between">
              <label>Grade Level</label>
              <span className="font-bold">{gradeLevel}</span>
            </div>
            <div className="flex justify-between">
              <label>Section Name</label>
              <span className="font-bold">{sectionName}</span>
            </div>
            <div className="flex justify-between ">
              <label>Student Total</label>
              <span className="font-bold">{totalStudents}</span>
            </div>
          </div>
          {/* --------------------------2nd column */}
          <div className="flex flex-col w-1/2">
            <div className="flex justify-between order-1">
              <label>Region</label>
              <span className="font-bold">{region}</span>
            </div>
            <div className="flex justify-between order-2">
              <label>School</label>
              <span className="font-bold">{schoolName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------List of Students */}
      <div className="flex flex-col justify-between mt-12">
        <SearchBox text="Search student"></SearchBox>

        <div className="flex flex-1 ">
          <table class="mt-4 table-fixed w-full text-md text-left">
            <thead>
              <tr className="border-b-4 border-black">
                <th>#</th>
                <th>Name</th>
                <th>Pre-Test Profile</th>
                <th>Post-Test Profile</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sectionStudents.map((s, idx) => {
                let student = s.data();
                return (
                  <tr>
                    <td>{idx + 1}</td>
                    <td>
                      {student.last_name +
                        ", " +
                        student.first_name +
                        " " +
                        student.middle_name.charAt(0) +
                        "."}
                    </td>
                    <td>{student.pretestProfile}</td>
                    <td>{student.posttestProfile}</td>
                    <td className="text-center">
                      <button
                        className="underline"
                        onClick={() => {
                          sessionStorage.setItem("student_ref_id", student.id);
                          router.push("/teacher/studentProfile");
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
