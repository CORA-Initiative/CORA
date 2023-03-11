import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faNotes,
  faClock,
  faFilePen,
} from "@fortawesome/free-solid-svg-icons";

export default function ReadingProfileSummary({
  test_type = "Pre-test",
  word_reading_score = 35,
  comprehension_score = 25,
  reading_rate = 45,
}) {
  const wrs_width = word_reading_score.toString() + "%";
  const cs_width = comprehension_score.toString() + "%";
  return (
    <div className="flex flex-col border p-12 gap-8 text-center align-middle w-full">
      <h3 className="font-bold text-2xl">Your {test_type} Profile</h3>
      {/* Stats */}
      {/* Word Reading Score */}
      <div className="flex flex-row gap-4">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faBook} size="2xl" color="#2A6190" />
        </div>
        <div className="text-left w-full">
          <h4 className="font-bold  text-gray-800">Word Reading Score</h4>
          <div className="w-full bg-neutral-200 dark:bg-neutral-600">
            <div
              className="bg-cyan-500 p-2 text-right text-xs font-medium leading-none text-primary-100"
              style={{ width: wrs_width }}
            >
              {wrs_width}
            </div>
          </div>
        </div>
      </div>

      {/* Comprehension Score */}
      <div className="flex flex-row gap-2">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faFilePen} size="2xl" color="#2A6190" />
        </div>
        <div className="text-left w-full">
          <h4 className="font-bold  text-gray-800">Comprehension Score</h4>
          <div className="w-full bg-neutral-200 dark:bg-neutral-600">
            <div
              className="bg-cyan-500 p-2 text-right text-xs font-medium leading-none text-primary-100"
              style={{ width: cs_width }}
            >
              {cs_width}
            </div>
          </div>
        </div>
      </div>

      {/* Reading Score */}
      <div className="flex flex-row gap-4">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faClock} size="2xl" color="#2A6190" />
        </div>
        <div className="flex flex-row text-left justify-between w-full ">
          <h4 className="font-bold text-gray-800">Reading Score</h4>
          <h4 className="font-bold text-xl">{reading_rate} Words Per Minute</h4>
        </div>
      </div>
      <button className="bg-cyan-600 p-4 text-white font-bold text-xl mt-4">
        Take {test_type}
      </button>
    </div>
  );
}
