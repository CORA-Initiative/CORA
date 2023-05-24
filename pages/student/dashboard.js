import { React, useState, useEffect, useLayoutEffect } from "react";
import ReadingProfileSummary from "@/components/StudentDashboard/ReadingProfileSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { thisUser } from "@/context/UserContext";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

// https://javascript.plainenglish.io/next-js-keep-state-7eb68984c54e
export default function dashboard() {
  const router = useRouter();
  const { logout, currentUser } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [handlerID, setHandlerID] = useState("");

  const [isPretestEnabled, setIsPretestEnabled] = useState("");
  const [isPosttestEnabled, setIsPosttestEnabled] = useState("");

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

  // DATA RETRIEVERS
  const getSchoolData = async (schoolRefID) => {
    const schoolRef = doc(db, "school", schoolRefID);

    const schoolSnap = await getDoc(schoolRef);

    if (schoolSnap.exists()) {
      let school = schoolSnap.data();

      console.log(school);
      sessionStorage.setItem("school_region", String(school.region));
      sessionStorage.setItem("school_name", school.name);
      sessionStorage.setItem("school_year", school.school_year);
    } else {
      console.log("No document found.");
    }
  };

  const getStudentData = async () => {
    // Get student data from db
    const studentsRef = collection(db, "students");
    const studentsQuery = query(
      studentsRef,
      where("id", "==", sessionStorage.getItem("student_ref_id"))
    );
    const querySnapshot = await getDocs(studentsQuery);

    querySnapshot.forEach((doc) => {
      let student = doc.data();
      console.log("In students querySnapshot: ", student);

      setFirstName(student.first_name);
      setLastName(student.last_name);
      sessionStorage.setItem("grade_level", student.grade_level);
      sessionStorage.setItem("handler_id", student.teacher_id);
      sessionStorage.setItem("student_sec_id", student.section_id);

      getSchoolData(student.school_id);
    });
  };

  // Set test type availability
  const setTestsAvailability = async () => {
    // Get teacher, check if pretest and posttest are enabled
    const teacherRef = collection(db, "teachers");
    const teacherQuery = query(
      teacherRef,
      where("id", "==", sessionStorage.getItem("handler_id"))
    );
    const teacherSnapshot = await getDocs(teacherQuery);

    teacherSnapshot.forEach((doc) => {
      let teacher = doc.data();

      console.log("teacher:", teacher);
      setIsPretestEnabled(teacher.isPretestEnabled);
      setIsPosttestEnabled(teacher.isPosttestEnabled);
    });
  };

  // Get pre-test data of student
  const getPretestData = async () => {
    console.log(">>> getPretestData()");

    console.log("student_id: ", sessionStorage.getItem("student_ref_id"));

    const pretestRef = collection(db, "pre-test");
    const pretestQuery = query(
      pretestRef,
      where("student_id", "==", sessionStorage.getItem("student_ref_id"))
    );
    const pretestQuerySnapshot = await getDocs(pretestQuery);

    pretestQuerySnapshot.forEach((doc) => {
      let pretestData = doc.data();

      console.log("Pretest", pretestData);
      if (pretestData.student_id === sessionStorage.getItem("student_ref_id")) {
        setPreTestScores((prevScores) => ({
          ...prevScores,
          reading_score: pretestData.reading_score_percentage,
          comprehension_score: pretestData.comprehension_score_percentage,
          reading_rate: pretestData.reading_speed,
        }));
      }
    });
  };

  // Get posttest data of student
  const getPosttestData = async () => {
    console.log(">>> getPosttestData()");

    const posttestRef = collection(db, "post-test");
    const posttestQuery = query(
      posttestRef,
      where("student_id", "==", sessionStorage.getItem("student_ref_id"))
    );
    const postTestQuerySnapshot = await getDocs(posttestQuery);

    postTestQuerySnapshot.forEach((doc) => {
      let posttestData = doc.data();

      if (
        posttestData.student_id === sessionStorage.getItem("student_ref_id")
      ) {
        setPostTestScores((prevScores) => ({
          ...prevScores,
          reading_score: posttestData.reading_score_percentage,
          comprehension_score: posttestData.comprehension_score_percentage,
          reading_rate: posttestData.reading_speed,
        }));
      }
    });
  };

  // FUNCTIONS
  const logoutStudent = () => {
    logout();
    router.push("/");
  };

  useEffect(() => {
    // A student ID must exist in sessionStorage i.e. email
    if (sessionStorage.getItem("student_ref_id")) {
      // Get student data
      getStudentData();
      setTestsAvailability();

      // And get pretest and posttest data if available
      getPretestData();
      getPosttestData();
    } else {
      console.log("Unable to identify the student.");
      router.push("/");
    }
  }, [handlerID]);

  useEffect(() => {
    // If user is not logged in, redirect them to welcome page
    if (currentUser === null) {
      router.push("/");
    }
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
          enableTakeTest={isPretestEnabled && preTestScores.reading_rate === 0}
        ></ReadingProfileSummary>
        <ReadingProfileSummary
          test_type="Post test"
          reading_score={postTestScores.reading_score}
          comprehension_score={postTestScores.comprehension_score}
          reading_rate={postTestScores.reading_rate}
          enableTakeTest={
            isPosttestEnabled && postTestScores.reading_rate === 0
          }
        ></ReadingProfileSummary>
      </div>
    </div>
  );
}
