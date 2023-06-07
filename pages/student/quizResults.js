import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import calculateReadingSpeed from "@/components/ReadingSpeed";


export default function quizResults() {
  const [testType, setTestType] = useState("");
  const [passageTitle, setPassageTitle] = useState();
  const [score, setScore] = useState();
  const [totalQuizItems, setTotalQuizItems] = useState();

  const [transcription, setTranscription] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [readingSpeed, setReadingSpeed] = useState();
  const [fileName, setFileName] = useState();
  const [audioTime, setAudioTime] = useState();

  useEffect(() => {
    if (
      sessionStorage.getItem("quiz_score") &&
      sessionStorage.getItem("total_quiz_items") &&
      sessionStorage.getItem("audio_upload_url") &&
      sessionStorage.getItem("audio_filename") &&
      sessionStorage.getItem("audio_time") 
    ) {
      setScore(sessionStorage.getItem("quiz_score"));
      setTotalQuizItems(sessionStorage.getItem("total_quiz_items"));
      setAudioURL(sessionStorage.getItem("audio_upload_url"));
      setFileName(sessionStorage.getItem("audio_filename"));
      setAudioTime(sessionStorage.getItem("audio_time"));
    } else {
      setScore(0);
      setTotalQuizItems(0);
      setAudioURL(null);
      setFileName(null);
      setAudioTime(0);
    }

    setTestType(sessionStorage.getItem("test_type"));
    setPassageTitle(sessionStorage.getItem("passage_title"));
  }, []);

  const { currentUser } = useAuth();
  useEffect(() => {
    // If user is not logged in, redirect them to welcome page
    if (currentUser === null && !sessionStorage.getItem("total_quiz_items")) {
      router.push("/");
    }
  }, []);


  // Send to sendAudio API Route and transcribe audio
  useEffect(() => {
    const transcribeAudio = async () => {
      try {
        const formData = new FormData();
        formData.append("audioURL", audioURL);
        formData.append("audioName", fileName);
 
        const response = await fetch("/api/sendAudio", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          setTranscription(data.transcription.text);
          console.log(data.transcription.text);
        } else {
          console.error("[Passage] Failed to transcribe audio");
        }
      } catch (error) {
        console.error("[Passage] An error occurred while transcribing audio:", error);
      }
    };
    transcribeAudio();
  }, [audioURL, fileName]);


  // Calculate the reading speed by calling the calculateReadingSpeed function
  useEffect(() => {
    const calculateReadingSpeedAsync = async () => {
      const readingSpeedResult = calculateReadingSpeed(audioTime, transcription);
      setReadingSpeed(readingSpeedResult);
      console.log(readingSpeedResult);
    };
  
    if (audioTime && transcription) {
      calculateReadingSpeedAsync();
    }
  }, [audioTime, transcription]);

  useEffect(() => {
    if (readingSpeed) {
      sessionStorage.setItem("reading_speed", readingSpeed);
    }
  }, [readingSpeed]);

  
  return (
    <div className="flex flex-col p-12 md:px-16 pt-8 gap-6">
      <div className="flex flex-col gap-24">
        <div className="flex flex-col text-center gap-2">
          <h2 className="text-3xl font-bold">
            {sessionStorage.getItem("test_type")} Quiz Results
          </h2>
          <p className="text-lg">{passageTitle}</p>
        </div>

        <div className="text-center text-gray-800">
          <p className="text-xl">You completed the {testType} Quiz!</p>
          <p className="text-lg">You got</p>
        </div>

        <div className="text-center flex flex-col gap-4">
          <h1 className="font-bold text-6xl">
            {score}/{totalQuizItems}
          </h1>
        </div>

        <div className="flex flex-col items-center mt-4">
          <Link href="/student/dashboard">
            <button className="bg-coraBlue-1 py-4 px-20 text-coraWhite text-xl font-bold rounded-lg hover:bg-cyan-700">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
