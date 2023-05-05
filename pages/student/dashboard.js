import { React, useState, useEffect, useLayoutEffect } from "react";
import ReadingProfileSummary from "@/components/StudentDashboard/ReadingProfileSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { thisUser } from "@/context/UserContext";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

// https://javascript.plainenglish.io/next-js-keep-state-7eb68984c54e
export default function dashboard() {
  const router = useRouter();
  const { logout } = useAuth();
  const user = thisUser();

  const [studentID, setStudentID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // TODO: Retrieve student info + pretest, posttest scores
  // Get student Pre-test and post-test data
  const [preTestScores, setPreTestScores] = useState({
    reading_score: 0,
    comprehension_score: 0,
    reading_rate: 0,
  });
  const [postTestScores, setPostTestScores] = useState({
    reading_score: 0,
    comprehension_score: 0,
    reading_rate: 0,
  });

  const getStudentData = async () => {
    const studentsRef = collection(db, "students");
    const studentsQuery = query(studentsRef, where("email", "==", studentID));

    const querySnapshot = await getDocs(studentsQuery);
    querySnapshot.forEach((doc) => {
      console.log("In students querySnapshot");

      let data = doc.data();

      setFirstName(data.first_name);
      setLastName(data.last_name);
      sessionStorage.setItem("grade_level", data.grade_level);
      console.log("Grade level", sessionStorage.getItem("grade_level"));
    });

    // TODO: Get passage by grade level and type
    const passageRef = collection(db, "passage");
    const passageQuery = query(
      passageRef,
      where("grade_level", "==", sessionStorage.getItem("grade_level"))
    );
    const passageSnapshot = await getDocs(passageQuery);
    passageSnapshot.forEach((doc) => {
      let passage = doc.data();

      console.log("Passage", passage);
      sessionStorage.setItem("passage_id", passage.id);
    });
  };

  const getPreTestData = async () => {
    console.log("In getTestsData()");

    const pretestRef = collection(db, "pre-test");
    const pretestQuery = query(
      pretestRef,
      where("student_id", "==", studentID)
    ); // Create a query against the collection.

    const querySnapshot = await getDocs(pretestQuery);
    querySnapshot.forEach((doc) => {
      console.log("In querySnapshot");

      let pretestData = doc.data();

      if (pretestData.student_id === studentID) {
        setPreTestScores((prevScores) => ({
          ...prevScores,
          reading_score: pretestData.reading_score_percentage,
          comprehension_score: pretestData.comprehension_score_percentage,
          reading_rate: pretestData.reading_speed,
        }));
      }
    });
  };

  const getPostTestData = async () => {
    const posttestRef = collection(db, "post-test"); // Create a reference to the cities collection
    const posttestQuery = query(
      posttestRef,
      where("student_id", "==", studentID)
    );

    const postTestQuerySnapshot = await getDocs(posttestQuery);

    postTestQuerySnapshot.forEach((doc) => {
      let posttestData = doc.data();

      console.log(posttestData);
      console.log("Posttest", posttestData.student_id, studentID);
      if (posttestData.student_id === studentID) {
        setPostTestScores((prevScores) => ({
          ...prevScores,
          reading_score: posttestData.reading_score_percentage,
          comprehension_score: posttestData.comprehension_score_percentage,
          reading_rate: posttestData.reading_speed,
        }));
      }
    });
  };
  const logoutStudent = () => {
    logout();
    router.push("/");
  };

  useLayoutEffect(() => {
    if (sessionStorage.getItem("userID")) {
      setStudentID(sessionStorage.getItem("userID"));
      getStudentData();
      getPreTestData();
      getPostTestData();
    } else {
      sessionStorage.setItem("state", "ABC");
      const cookie = sessionStorage.getItem("state");
      console.log(cookie);
    }
  }, [studentID, firstName, lastName]);

  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <div className="p-12 md:px-24 pt-8">
      <div className="flex py-2 flex-row justify-between mt-6 mb-10">
        <div className="w-3/4 flex flex-row gap-6">
          <div className="flex items-center overflow-hidden text-coraBlue-1 sm:text-5xl hidden sm:block">
            <FontAwesomeIcon icon={faFaceSmile} />
          </div>
          <div className="">
            <p className="text-2xl font-bold uppercase">
              Hello, {firstName} {lastName}!
            </p>
            <p className="text-l">Welcome to CORA.</p>
          </div>
        </div>
        <button onClick={logoutStudent} className="flex align-start underline">
          Logout
        </button>
      </div>
      {/* Main Content */}
      <div className="w-full flex flex-col md:flex-row gap-8 lg:gap-32 px-4 justify-center mt-16">
        <ReadingProfileSummary
          test_type="Pre-test"
          reading_score={preTestScores.reading_score}
          comprehension_score={preTestScores.comprehension_score}
          reading_rate={preTestScores.reading_rate}
          enableTakeTest={user.isPretestEnabled}
        ></ReadingProfileSummary>
        <ReadingProfileSummary
          test_type="Post-test"
          reading_score={postTestScores.reading_score}
          comprehension_score={postTestScores.comprehension_score}
          reading_rate={postTestScores.reading_rate}
          enableTakeTest={user.isPosttestEnabled}
        ></ReadingProfileSummary>
      </div>
    </div>
  );
}
