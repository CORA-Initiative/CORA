import { React, useState } from "react";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faChevronRight,
  faSquare,
  faCheckCircle,
  faCheckSquare,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function passageReading({
  title = "Liquids Good For You",
  text = "There are many liquids that are good for our health like water, fruit juice, and milk. Milk makes our bones strong. Juice gives us vitamins, while water cleans our body. Let's drink milk, juice, and water to make us healthy.",
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingCompleted, setIsRecordingCompleted] = useState(false);
  return (
    <div className="flex flex-col justify-between h-full">
      {/* Text */}
      <div className="p-12 md:px-16 pt-8">
        <BackButton />
        <div className="flex flex-col flex-1  text-center py-20 px-8 md:px-20 lg:px-60 gap-12">
          <h1 className="font-bold text-6xl">{title}</h1>
          <p className="text-justify indent-12 text-3xl leading-loose">
            {text}
          </p>
        </div>
      </div>
      {/* Footer  */}
      <div className="flex flex-row bg-coraBlue-3 justify-between items-center fixed bottom-0 p-2 w-full">
        {/* Recording indicator */}
        <div
          className={`flex flex-row items-center gap-2 ${
            isRecording && !isRecordingCompleted ? "visible" : "invisible"
          }`}
        >
          <div className="animate-pulse">
            <FontAwesomeIcon icon={faCircle} color="#FB3C3C" size="sm" />
          </div>
          <p className="">Recording</p>
        </div>

        {!isRecording && (
          <button
            className="flex flex-col hover:text-gray-800 text-md"
            onClick={() => setIsRecording(true)}
          >
            <FontAwesomeIcon icon={faCircle} color="#FB3C3C" size="2xl" />
            Start Recording
          </button>
        )}
        {isRecording && !isRecordingCompleted && (
          <button
            className="flex flex-col hover:text-gray-800 text-md"
            onClick={() => {
              setIsRecordingCompleted(true);
            }}
          >
            <FontAwesomeIcon icon={faSquare} size="2xl" />
            Stop
          </button>
        )}
        {isRecordingCompleted && (
          <div className="flex flex-col hover:text-gray-800 text-md">
            <FontAwesomeIcon icon={faCheck} color="green" size="2xl" />
            Reading Recording Saved
          </div>
        )}

        {/* Take quiz button */}

        <Link href="/student/takeQuiz">
          <button
            className={`flex flex-row items-center gap-2 ${
              isRecordingCompleted ? "visible" : "invisible"
            }`}
          >
            <p className="underline text-lg">Take Quiz</p>
            <FontAwesomeIcon icon={faChevronRight} size="sm" />
          </button>
        </Link>
      </div>
    </div>
  );
}
