import React, { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import { useAuth } from "@/context/AuthContext";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { useRouter } from "next/router";

export default function studentProfile() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState("");

  const [pretestData, setPretestData] = useState({});
  const [pretestDate, setPretestDate] = useState("");
  const [pretestQuizAnzwers, setPretestQuizAnswers] = useState("");

  const [posttestData, setPosttestData] = useState({});
  const [posttestDate, setPosttestDate] = useState("");
  const [posttestQuizAnswers, setPosttestQuizAnswers] = useState("");

  const [pretestPassage, setPretestPassage] = useState({});
  const [posttestPassage, setPosttestPassage] = useState({});

  const tba = "To Be Assessed";

  async function fetchPassage(id) {
    console.log("fetch", id);
    const passageRef = doc(db, "passage", id);
    const passageSnap = await getDoc(passageRef);

    let passageTextAndQuiz = {};
    if (passageSnap.exists()) {
      let passage = passageSnap.data();

      const cleanedPassageText = passage.text.split("\\n").join(" ");

      passageTextAndQuiz.text = cleanedPassageText;
      const answer_keys = passage.quiz.map((items) => {
        return <p>{items.answer_key}</p>;
      });

      passageTextAndQuiz.quiz_answers = answer_keys;
      console.log("quiz_answers", typeof passageTextAndQuiz.quiz_answers);
    } else {
      console.log("Failed to fetch passage.");
    }

    return passageTextAndQuiz;
  }
  const getWordReadingProfile = (readingScorePercentage) => {
    if (typeof readingScorePercentage === "undefined") {
      return tba;
    }
    const parsedPercentage = parseInt(readingScorePercentage);
    let readingProfile = "";
    if (parsedPercentage >= 97) {
      readingProfile = "Independent";
    } else if (parsedPercentage >= 90 && parsedPercentage <= 96) {
      readingProfile = "Instructional";
    } else {
      readingProfile = "Frustration";
    }

    return readingProfile;
  };

  const getComprehensionProfile = (comprehensionScorePercentage) => {
    if (typeof comprehensionScorePercentage === "undefined") {
      return tba;
    }

    const parsedPercentage = parseInt(comprehensionScorePercentage);

    let comprehensionProfile = "";
    if (parsedPercentage >= 80) {
      comprehensionProfile = "Independent";
    } else if (parsedPercentage >= 59 && parsedPercentage <= 79) {
      comprehensionProfile = "Instructional";
    } else {
      comprehensionProfile = "Frustration";
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

    let pretestPassageID = "";
    const pretestSnap = await getDocs(pretestQuery);
    pretestSnap.forEach((doc) => {
      setPretestDate(doc.data().date_taken.toDate().toDateString());
      setPretestData(doc.data());

      const answers = doc.data().answers.map((item) => {
        return <p>{item}</p>;
      });

      setPretestQuizAnswers(answers);
      pretestPassageID = doc.data().passage_id;
    });

    if (pretestPassageID === "") {
      return;
    }
    let p = await fetchPassage(pretestPassageID);
    console.log("p", p);
    setPretestPassage(p);
  };

  const getPosttestData = async () => {
    const posttestRef = collection(db, "post-test");
    const posttestQuery = query(
      posttestRef,
      where("student_id", "==", sessionStorage.getItem("student_ref_id")),
      where("school_year", "==", sessionStorage.getItem("school_year"))
    );

    const posttestSnap = await getDocs(posttestQuery);

    let posttestPassageID = "";
    posttestSnap.forEach((doc) => {
      setPosttestDate(doc.data().date_taken.toDate().toDateString());
      setPosttestData(doc.data());

      console.log("Posttest data", doc.data());
      const answers = doc.data().answers.map((item) => {
        return <p>{item}</p>;
      });

      setPosttestQuizAnswers(answers);
      posttestPassageID = doc.data().passage_id;
    });

    if (posttestPassageID === "") {
      return;
    }
    let p = await fetchPassage(posttestPassageID);
    console.log("p", p);
    setPosttestPassage(p);
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

  // Authenticate user before letting page display
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser === null) {
      router.push("/");
      return;
    }
    getStudentData();
    getPretestData();
    getPosttestData();
  }, []);

  return (
    <div className="p-24 pt-8">
      {/* Back button */}
      <BackButton />
      <div className="flex justify-center mt-4">
        <p className="font-bold text-3xl">Student Profile</p>
      </div>

      <div className="flex flex-col">
        {/* Student Details */}
        <div className="flex flex-1 py-8 px-12">
          <table className="table-fixed w-1/2 text-md text-left mt-4">
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
        <div className="flex flex-col p-12 border-t-4 border-cyan-600 gap-8 ">
          <table class="table-fixed text-md text-left w-1/2">
            <tr>
              <th>Pre-Test Passage</th>
              <td className="uppercase font-bold">
                {pretestData.passage_title
                  ? pretestData.passage_title
                  : "NOT YET TAKEN"}
              </td>
            </tr>
            <tr>
              <td>Date Taken</td>
              <td>{pretestDate}</td>
            </tr>
          </table>

          <table className="table-fixed w-full text-md text-left">
            <thead>
              <tr>
                <th className="text-lg font-bold text-coraBlue-4 uppercase">
                  Overview
                </th>
              </tr>
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
                  {getWordReadingProfile(pretestData.reading_score_percentage)}
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
                <th>Reading Rate (words per minute)</th>
                <td>{pretestData.reading_rate} wpm</td>
              </tr>
            </tbody>
          </table>

          <table class="table-fixed text-md text-left w-1/2">
            <tr>
              <th>Oral Reading Profile</th>
              <td className="uppercase font-bold underline">
                {pretestData.oral_reading_profile
                  ? pretestData.oral_reading_profile
                  : tba}
              </td>
            </tr>
          </table>
          <table class="table-fixed text-md text-left w-1/2 border-spacing-4">
            <tr>
              <th className="text-lg font-bold text-coraBlue-4 uppercase">
                Data
              </th>
            </tr>
            <tr>
              <th>Passage Text</th>
              <th>Generated Speech transcription</th>
            </tr>
            <tr>
              <td className="italic">{pretestPassage.text}</td>
              <td className="italic">
                {pretestData.transcription_text
                  ? pretestData.transcription_text
                  : tba}
              </td>
            </tr>
            <tr>
              <th>Quiz Key Answers</th>
              <th>Answers</th>
            </tr>
            <tr>
              <td className="italic">{pretestPassage.quiz_answers}</td>
              <td className="italic">{pretestQuizAnzwers}</td>
            </tr>
          </table>
        </div>

        {/* Post-test Results */}
        <div className="flex flex-col p-12 border-t-4 border-cyan-600 gap-10">
          <table className="table-fixed w-1/2 text-md text-left">
            <tr>
              <th>Post Test Passage</th>
              <td className="uppercase font-bold">
                {posttestData.passage_title
                  ? posttestData.passage_title
                  : "NOT YET TAKEN"}
              </td>
            </tr>
            <tr>
              <td>Date Taken</td>
              <td>{posttestDate}</td>
            </tr>
          </table>
          <table className="table-fixed w-full text-md text-left">
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
                  {getWordReadingProfile(posttestData.reading_score_percentage)}
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
                <td>{posttestData.reading_rate} wpm</td>
              </tr>
            </tbody>
          </table>
          <table className="table-fixed text-md text-left w-1/2">
            <tr>
              <th>Oral Reading Profile</th>
              <td className="uppercase font-bold underline">
                {posttestData.oral_reading_profile
                  ? posttestData.oral_reading_profile
                  : tba}
              </td>
            </tr>
          </table>
          <table class="table-fixed text-md text-left w-1/2 border-spacing-4">
            <tr>
              <th className="text-lg font-bold text-coraBlue-4 uppercase">
                Data
              </th>
            </tr>
            <tr>
              <th>Passage Text</th>
              <th>Generated Speech transcription</th>
            </tr>
            <tr>
              <td className="italic">{posttestPassage.text}</td>
              <td className="italic">
                {posttestData.transcription_text
                  ? posttestData.transcription_text
                  : tba}
              </td>
            </tr>
            <tr>
              <th>Quiz Key Answers</th>
              <th>Answers</th>
            </tr>
            <tr>
              <td className="italic">{posttestPassage.quiz_answers}</td>
              <td className="italic">{posttestQuizAnswers}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
