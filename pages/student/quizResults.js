import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import calculateReadingSpeed from "@/components/ReadingSpeed";
import { collection, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import globalAlignment from "@/components/Global";
import { toast } from "react-toastify";

export default function quizResults() {
  const [testType, setTestType] = useState("");
  const [passageTitle, setPassageTitle] = useState();
  const [score, setScore] = useState();
  const [totalQuizItems, setTotalQuizItems] = useState();

  const [transcription, setTranscription] = useState("");
  const [audioURL, setAudioURL] = useState(null);
  const [readingSpeed, setReadingSpeed] = useState();
  const [fileName, setFileName] = useState();
  const [audioTime, setAudioTime] = useState();

  // const [specificMiscues, setSpecificMiscues] = useState({});
  // const [transcriptionText, setTranscriptionText] = useState("");
  const [specificMiscues, setSpecificMiscues] = useState({});
  const [transcriptionText, setTranscriptionText] = useState("");

  const [isHomeEnabled, setIsHomeEnabled] = useState(false);

  const evaluateOverallReadingProfile = () => {
    // Set comprehension profile
    const comprehensionScorePercentage = Math.round(
      (Number(sessionStorage.getItem("quiz_score")) /
        Number(sessionStorage.getItem("total_quiz_items"))) *
        100
    );

    let comprehensionProfile = "";
    if (comprehensionScorePercentage >= 80) {
      comprehensionProfile = "Independent";
    } else if (
      comprehensionScorePercentage >= 59 &&
      comprehensionScorePercentage <= 79
    ) {
      comprehensionProfile = "Instructional";
    } else {
      comprehensionProfile = "Frustration";
    }

    const readingScorePercentage = Math.round(
      ((Number(sessionStorage.getItem("total_words_passage")) -
        Number(sessionStorage.getItem("number_of_miscues"))) /
        Number(sessionStorage.getItem("total_words_passage"))) *
        100
    );

    let readingProfile = "";
    if (readingScorePercentage >= 97) {
      readingProfile = "Independent";
    } else if (readingScorePercentage >= 90 && readingScorePercentage <= 96) {
      readingProfile = "Instructional";
    } else {
      readingProfile = "Frustration";
    }

    // Set overalll reading profile
    let overallReadingProfile = "";
    if (
      readingProfile === "Independent" &&
      comprehensionProfile === "Independent"
    ) {
      overallReadingProfile = "Independent";
    } else if (
      readingProfile === "Independent" &&
      comprehensionProfile === "Instructional"
    ) {
      overallReadingProfile = "Instructional";
    } else if (
      readingProfile === "Instructional" &&
      comprehensionProfile === "Independent"
    ) {
      overallReadingProfile = "Instructional";
    } else if (
      readingProfile === "Frustration" &&
      comprehensionProfile === "Instructional"
    ) {
      overallReadingProfile = "Frustration";
    } else {
      overallReadingProfile = "Frustration";
    }
    return overallReadingProfile;
  };

  const updateTestResults = async (collection_name = "") => {
    try {
      const toUpdate = doc(
        db,
        collection_name,
        sessionStorage.getItem("resultsDocID")
      );
      await updateDoc(toUpdate, {
        reading_rate: Math.round(
          Number(sessionStorage.getItem("oral_reading_speed"))
        ),
        quiz_score: Number(sessionStorage.getItem("quiz_score")),
        quiz_total: Number(sessionStorage.getItem("total_quiz_items")),
        number_of_miscues: Number(sessionStorage.getItem("number_of_miscues")),
        specific_miscues: specificMiscues,
        reading_score_percentage: Math.round(
          ((Number(sessionStorage.getItem("total_words_passage")) -
            Number(sessionStorage.getItem("number_of_miscues"))) /
            Number(sessionStorage.getItem("total_words_passage"))) *
            100
        ),
        comprehension_score_percentage: Math.round(
          (Number(sessionStorage.getItem("quiz_score")) /
            Number(sessionStorage.getItem("total_quiz_items"))) *
            100
        ),
        oral_reading_profile: evaluateOverallReadingProfile(),
        transcription_text: transcriptionText,
      });

      // Update student profile
      const updateStudent = doc(
        db,
        "students",
        sessionStorage.getItem("student_ref_id")
      );

      if (sessionStorage.getItem("test_type") === "Pre-test") {
        await updateDoc(updateStudent, {
          pretestProfile: evaluateOverallReadingProfile(),
        });
      } else {
        await updateDoc(updateStudent, {
          posttestProfile: evaluateOverallReadingProfile(),
        });
      }

      setIsHomeEnabled(true);
      toast.success("Results have been saved! You may return to homepage.");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

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

        const miscues = globalAlignment(
          sessionStorage.getItem("passage_text"),
          data.transcription.text
        );

        const numberOfMiscues =
          miscues.numDeletions +
          miscues.numInsertions +
          miscues.numSubstitutions;

        console.log("Miscues", miscues);
        console.log("Number of Miscues", numberOfMiscues);

        console.log("Specific Miscues: ", miscues);
        console.log("Transcription: ", data.transcription.text);
        setSpecificMiscues(miscues);
        setTranscriptionText(data.transcription.text);
        // setSpecificMiscues(numberOfMiscues);
        // setTranscriptionText(data.transcription.text);
        sessionStorage.setItem("number_of_miscues", numberOfMiscues);

        let c_name = "";
        if (sessionStorage.getItem("test_type") == "Pre-test") {
          c_name = "pre-test";
        } else {
          c_name = "post-test";
        }

        updateTestResults(c_name);
      } else {
        console.error("[Passage] Failed to transcribe audio");
      }
    } catch (error) {
      console.error(
        "[Passage] An error occurred while transcribing audio:",
        error
      );
    }
  };

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
    transcribeAudio();
  }, [audioURL, fileName]);

  // Calculate the reading rate by calling the calculateReadingSpeed function
  useEffect(() => {
    const oralReadingSpeed =
      (Number(sessionStorage.getItem("total_words_passage")) /
        Number(sessionStorage.getItem("audio_time"))) *
      60;

    console.log(sessionStorage.getItem("total_words_passage"));
    console.log(sessionStorage.getItem("audio_time"));

    sessionStorage.setItem("oral_reading_speed", oralReadingSpeed);
  }, []);

  useEffect(() => {
    if (isHomeEnabled) {
      toast.success("Results have been saved! You may return to homepage");
    } else {
      toast.info("We're saving your results.");
    }
  }, [isHomeEnabled]);

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
            {sessionStorage.getItem("quiz_score")}/
            {sessionStorage.getItem("total_quiz_items")}
          </h1>
        </div>

        <div className="flex flex-col items-center mt-4">
          <Link href="/student/dashboard">
            <button
              className="bg-coraBlue-1 py-4 px-20 text-coraWhite text-xl font-bold rounded-lg hover:bg-cyan-700 disabled:bg-gray-500"
              disabled={!isHomeEnabled}
            >
              Return Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
