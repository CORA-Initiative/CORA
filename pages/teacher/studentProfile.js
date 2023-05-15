import React, { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";

import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

export default function studentProfile() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState("");

  const [pretestData, setPretestData] = useState({});
  const [pretestDate, setPretestDate] = useState("");
  const [posttestData, setPosttestData] = useState({});
  const [posttestDate, setPosttestDate] = useState("");

  const getReadingProfile = (readingScorePercentage) => {
    let readingProfile = "";
    if (readingScorePercentage >= 97) {
      readingProfile = "Independent";
    } else if (readingScorePercentage >= 90 && readingScorePercentage <= 96) {
      readingProfile = "Instructional";
    } else {
      readingProfile = "Frustation";
    }

    return readingProfile;
  };

  const getComprehensionProfile = (comprehensionScorePercentage) => {
    let comprehensionProfile = "";
    if (comprehensionScorePercentage >= 80) {
      comprehensionProfile = "Independent";
    } else if (
      comprehensionScorePercentage >= 59 &&
      comprehensionScorePercentage <= 79
    ) {
      comprehensionProfile = "Instructional";
    } else {
      comprehensionProfile = "Frustation";
    }

    return comprehensionProfile;
  };
  const getPretestData = async () => {
    const pretestRef = collection(db, "pre-test");
    const pretestQuery = query(
      pretestRef,
      where("student_id", "==", sessionStorage.getItem("student_ref_id")),
      where("school_year", "==", sessionStorage.getItem("school_year"))
    );

    const pretestSnap = await getDocs(pretestQuery);

    pretestSnap.forEach((doc) => {
      setPretestDate(doc.data().date_taken.toDate().toDateString());
      setPretestData(doc.data());
    });
  };

  const getPosttestData = async () => {
    const posttestRef = collection(db, "post-test");
    const posttestQuery = query(
      posttestRef,
      where("student_id", "==", sessionStorage.getItem("student_ref_id")),
      where("school_year", "==", sessionStorage.getItem("school_year"))
    );

    const posttestSnap = await getDocs(posttestQuery);

    posttestSnap.forEach((doc) => {
      setPosttestDate(doc.data().date_taken.toDate().toDateString());
      setPosttestData(doc.data());
    });
  };

  const getStudentData = async () => {
    const studentRef = doc(
      db,
      "students",
      sessionStorage.getItem("student_ref_id")
    );
    const studentSnap = await getDoc(studentRef);

    if (studentSnap.exists()) {
      let student = studentSnap.data();

      setFirstName(student.first_name);
      setMiddleName(student.middle_name);
      setLastName(student.last_name);
    } else {
      console.log("Failed to fetch student.");
    }
  };

  useEffect(() => {
    getStudentData();
    getPretestData();
    getPosttestData();
  }, []);
  return (
    <div className="p-12 pt-4">
      {/* Back button */}
      <BackButton />
      <div className="flex justify-center">
        <p className="font-bold text-3xl">Student Profile</p>
      </div>

      <div className="flex flex-col">
        {/* Student Details */}
        <div className="flex flex-1 py-8 px-12">
          <table class="table-fixed w-1/2 text-md text-left">
            <thead>
              <tr>
                <th>Name</th>
                <td className="uppercase">
                  {lastName}, {firstName} {middleName}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Grade Level & Section</th>
                <td className="uppercase">
                  {sessionStorage.getItem("sec_grade_level")} -{" "}
                  {sessionStorage.getItem("sec_name")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pre-Test Results */}
        <div className="flex flex-col p-12 border-t-4 border-cyan-600 gap-10 ">
          <table class="table-fixed text-md text-left w-1/2">
            <tr>
              <th>Pre-Test Passage</th>
              <td className="uppercase">{pretestData.passage_title}</td>
            </tr>
            <tr>
              <td>Date Taken</td>
              <td>{pretestDate}</td>
            </tr>
          </table>
          <table class="table-fixed w-full text-md text-left">
            <thead>
              <tr>
                <td></td>
                <th>Detail</th>
                <th>Percentage</th>
                <th>Profile Level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Word Reading Score</th>
                <td>{pretestData.number_of_miscues} miscues</td>
                <td>{pretestData.reading_score_percentage}%</td>
                <td>
                  {getReadingProfile(pretestData.reading_score_percentage)}
                </td>
              </tr>
              <tr>
                <th>Comprehension Score</th>
                <td>
                  {pretestData.quiz_score}/{pretestData.quiz_total}
                </td>
                <td>{pretestData.comprehension_score_percentage}%</td>
                <td>
                  {getComprehensionProfile(
                    pretestData.comprehension_score_percentage
                  )}
                </td>
              </tr>
              <tr>
                <th>Reading Speed (words per minute)</th>
                <td>{pretestData.reading_speed} wpm</td>
              </tr>
            </tbody>
          </table>
          <table class="table-fixed text-md text-left w-1/2">
            <tr>
              <th>Oral Reading Profile</th>
              <td className="uppercase font-bold underline">
                {pretestData.oral_reading_profile}
              </td>
            </tr>
          </table>
        </div>

        {/* Post-test Results */}
        {/* Pre-Test Results */}
        <div className="flex flex-col p-12 border-t-4 border-cyan-600 gap-10">
          <table class="table-fixed w-1/2 text-md text-left">
            <tr>
              <th>Post Test Passage</th>
              <td className="uppercase">{posttestData.passage_title}</td>
            </tr>
            <tr>
              <td>Date Taken</td>
              <td>{posttestDate}</td>
            </tr>
          </table>
          <table class="table-fixed w-full text-md text-left">
            <thead>
              <tr>
                <td></td>
                <th>Detail</th>
                <th>Percentage</th>
                <th>Profile Level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Word Reading Score</th>
                <td>{posttestData.number_of_miscues} miscues</td>
                <td>{posttestData.reading_score_percentage}%</td>
                <td>
                  {getReadingProfile(posttestData.reading_score_percentage)}
                </td>
              </tr>
              <tr>
                <th>Comprehension Score</th>
                <td>
                  {posttestData.quiz_score}/{posttestData.quiz_total}
                </td>
                <td>{posttestData.comprehension_score_percentage}%</td>
                <td>
                  {getComprehensionProfile(
                    posttestData.comprehension_score_percentage
                  )}
                </td>
              </tr>
              <tr>
                <th>Reading Speed (words per minute)</th>
                <td>{posttestData.reading_speed} wpm</td>
              </tr>
            </tbody>
          </table>
          <table class="table-fixed text-md text-left w-1/2">
            <tr>
              <th>Oral Reading Profile</th>
              <td className="uppercase font-bold underline">
                {posttestData.oral_reading_profile}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
