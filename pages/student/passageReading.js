import React, { useEffect, useState, useRef } from "react";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function passageReading() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState([]);

  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingCompleted, setIsRecordingCompleted] = useState(false);
  const [blobUrl, setBlobUrl] = useState();
  const [audioFile, setAudioFile] = useState();
  const [transcription, setTranscription] = useState(null);
  const [audioURL, setAudioURL] = useState(null);

  const current = new Date();
  const date = `${current.getMonth()+1}-${current.getDate()}-${current.getFullYear()}`;

  const user = "Apple";
  const fileName = `${user}_${title}_${date}_audio.wav`;

  const recorderControls = useAudioRecorder();

  const fetchPassageTitleAndText = async () => {
    console.log("In fetchPassageTitleAndText()");

    // console.log("Passage ID", sessionStorage.getItem("passage_id"));
    const passageRef = doc(db, "passage", sessionStorage.getItem("passage_id"));
    const passageSnap = await getDoc(passageRef);

    if (passageSnap.exists()) {
      let passage = passageSnap.data();

      setTitle(passage.title);
      setText(passage.text.split("\\n"));

      console.log(title);
    } else {
      console.log("Failed to fetch passage.");
    }
  };

  // Record audio
  const getAudioFile = async (blob) => {
    //const blob1 = new Blob(blob, {type:'audio/mp3'});
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
  
    console.log("url", url);
    console.log("audio", audio);

    // Save as audio as WAV File
    const response = await fetch(url);
    const blobData = await response.blob();
    const file = new File([blobData], fileName, { type: "audio/wav" }, { lastModified: Date.now() });
  
    audio.src = url;
    audio.type = "audio/wav";
    audio.controls = true;
    console.log("audio", audio);
    // audio.download = "audio.mp3";
    // audio.click();
    
    setAudioFile(file);
    setIsRecordingCompleted(true);

    setBlobUrl(url);
    uploadAudio(file);
  };

  // Upload audio to Firestore Storage
  const uploadAudio = (audioFile) => {
    if (audioFile == null) return;

    const audioRef = ref(storage, `audios/${fileName}`);
    uploadBytes(audioRef, audioFile)
      .then(() => {
        console.log("Audio uploaded");
        getDownloadURL(audioRef)
          .then((url) => {
            setAudioURL(url);
            console.log("Download URL:", url);
            // Do whatever you need to do with the URL here
          })
          .catch((error) => {
            console.log("Error getting download URL:", error);
          });
      })
    .catch((error) => {
      console.log("Error uploading audio:", error);
    });
  }

  // Send to sendAudio API Route and transcribe audio
  useEffect(() => {
    const transcribeAudio = async () => {
      try {
        const formData = new FormData();
        formData.append("audioURL", audioURL);
 
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
  
    if (isRecordingCompleted) {
      transcribeAudio();
    }
  }, [audioURL, isRecordingCompleted]);

 
  useEffect(() => {
    fetchPassageTitleAndText();
  }, []);

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Text */}
      <div className="p-12 md:px-16 pt-8">
        <BackButton />
        <div className="flex flex-col flex-1 text-center py-8 px-8 md:px-20 lg:px-60 gap-8">
          <h1 className="font-bold text-6xl">{title}</h1>
          <div className="text-justify text-3xl">
            {text.map((line) => {
              return <p className="indent-12 leading-loose">{line.trim()}</p>;
            })}
          </div>
        </div>
      </div>

      {/* Footer  */}
      <div className="flex flex-row bg-coraBlue-3 justify-between items-center fixed bottom-0 p-4 w-full">
        <AudioRecorder
          onRecordingComplete={(blob) => getAudioFile(blob)}
          recorderControls={recorderControls}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          downloadFileExtension="wav"
        ></AudioRecorder>

        {/* Recording indicator */}
        {/* <div
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
            onClick={() => {
              setIsRecording(true);
              recorderControls.startRecording;
              console.log("Start recording.");
            }}
          >
            <FontAwesomeIcon icon={faCircle} color="#FB3C3C" size="2xl" />
            Start Recording
          </button>
        )}

        {isRecording && !isRecordingCompleted && (
          <button
            className="flex flex-col hover:text-gray-800 text-md"
            onClick={(e) => {
              setIsRecordingCompleted(true);
              recorderControls.stopRecording;
              console.log("Stop recording.");
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
        )} */}

        {/* Take quiz button */}
        <Link href="/student/takeQuiz">
          <button
            className={`flex flex-row items-center gap-2 bg-white px-4 py-2 font-bold border-1 rounded-md shadow-sm ${
              isRecordingCompleted ? "visible" : "invisible"
            }`}
          >
            <p className="text-lg">Take Quiz</p>
            <FontAwesomeIcon icon={faChevronRight} size="sm" />
          </button>
        </Link>
      </div>
    </div>
  );
}
