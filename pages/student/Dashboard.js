import React from "react";
import ReadingProfileSummary from "@/components/studentDashboard/ReadingProfileSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard({ user = "Juan Dela Cruz" }) {
  return (
    <div className="p-12 md:px-24 pt-8">
      <div className="flex py-2 flex-row justify-between mt-6 mb-10">
        <div className="w-3/4 flex flex-row gap-6">
          <div className="flex items-center overflow-hidden text-coraBlue-1 sm:text-5xl hidden sm:block">
            <FontAwesomeIcon icon={faFaceSmile} />
          </div>
          <div className="">
            <p className="text-2xl font-bold uppercase">Hello, {user}!</p>
            <p className="text-l">Welcome to CORA.</p>
          </div>
        </div>
        <button className="flex align-start underline">Logout</button>
      </div>
      {/* Main Content */}
      <div className="w-full flex flex-col md:flex-row gap-8 lg:gap-32 px-4 justify-center mt-16">
        <ReadingProfileSummary
          test_type="Pre-test"
          word_reading_score={35}
          comprehension_score={25}
          reading_rate={45}
        ></ReadingProfileSummary>
        <ReadingProfileSummary
          test_type="Post-test"
          word_reading_score={45}
          comprehension_score={35}
          reading_rate={55}
          disableTakeTest={true}
        ></ReadingProfileSummary>
      </div>
    </div>
  );
}
