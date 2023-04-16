import { React, useState } from "react";
import ReadingProfileSummary from "@/components/StudentDashboard/ReadingProfileSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { thisUser } from "@/context/UserContext";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

export default function dashboard() {
  const user = thisUser();

  const { logout } = useAuth();
  const router = useRouter();

  const logoutStudent = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="p-12 md:px-24 pt-8">
      <div className="flex py-2 flex-row justify-between mt-6 mb-10">
        <div className="w-3/4 flex flex-row gap-6">
          <div className="flex items-center overflow-hidden text-coraBlue-1 sm:text-5xl hidden sm:block">
            <FontAwesomeIcon icon={faFaceSmile} />
          </div>
          <div className="">
            <p className="text-2xl font-bold uppercase">
              Hello, {user.firstName} {user.lastName}!
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
          word_reading_score={user.preTestScores.word_reading_score}
          comprehension_score={user.preTestScores.comprehension_score}
          reading_rate={user.preTestScores.reading_rate}
          disableTakeTest={false}
        ></ReadingProfileSummary>
        <ReadingProfileSummary
          test_type="Post-test"
          word_reading_score={user.postTestScores.word_reading_score}
          comprehension_score={user.postTestScores.comprehension_score}
          reading_rate={user.postTestScores.reading_rate}
          disableTakeTest={true}
        ></ReadingProfileSummary>
      </div>
    </div>
  );
}
