import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faNotes,
  faClock,
  faFilePen,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function ReadingProfileSummary({
  test_type = "Test",
  word_reading_score,
  comprehension_score,
  reading_rate,
  disableTakeTest = false,
}) {
  const wrs_width = word_reading_score.toString() + "%";
  const cs_width = comprehension_score.toString() + "%";
  return (
    <div className="flex flex-col text-center border border-coraBlue-2 pt-8 gap-8 rounded-2xl overflow-hidden ">
      <h3 className="font-bold text-2xl">Your {test_type} Profile</h3>
      <div className="flex flex-col text-center gap-10 mx-12">
        {/* Reading Profile Summaries */}
        {/* Word Reading Score */}
        <div className="flex flex-row gap-4">
          <div className="flex items-center text-coraBlue-1 text-3xl">
            <FontAwesomeIcon icon={faBook} />
          </div>
          <div className="text-left w-full">
            <h4 className="font-bold text-gray-800">Word Reading Score</h4>
            <div className="border border-gray-400">
              <div
                className="text-white bg-gray-400 p-2 text-right text-xs"
                style={{ width: wrs_width }}
              >
                {wrs_width}
              </div>
            </div>
          </div>
        </div>

        {/* Comprehension Score */}
        <div className="flex flex-row gap-2">
          <div className="flex items-center text-coraBlue-1 text-3xl">
            <FontAwesomeIcon icon={faFilePen} />
          </div>
          <div className="text-left w-full">
            <h4 className="font-bold text-gray-800">Comprehension Score</h4>
            <div className="border border-gray-400">
              <div
                className="bg-gray-400 p-2 text-right text-xs font-medium leading-none text-white"
                style={{ width: cs_width }}
              >
                {cs_width}
              </div>
            </div>
          </div>
        </div>

        {/* Reading Score */}
        <div className="flex flex-row gap-4">
          <div className="flex items-center text-coraBlue-1 text-3xl">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="flex flex-row text-left justify-between w-full gap-10">
            <h4 className="font-bold text-gray-800">Reading Score</h4>
            <h4 className="font-bold text-xl">
              {reading_rate} words per minute
            </h4>
          </div>
        </div>
      </div>
      <Link href="/student/passageTitle">
        <button
          disabled={disableTakeTest}
          className="mt-4 bg-coraBlue-1 p-4 text-white font-bold text-xl disabled:opacity-50 w-full"
        >
          Take {test_type}
        </button>
      </Link>
    </div>
  );
}
