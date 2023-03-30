import React from "react";
// import { Configuration, OpenAIApi } from "openai";

export default function Whisper() {
  const ORG_ID = "org-bEonmwui21neUcGZClZASTMZ";

  let fs = require("fs");

  // const configuration = new Configuration({
  //   organization: process.env.OPENAI_CORA_ORG_ID,
  //   apiKey: process.env.OPENAI_API_KEY,
  // });

  const sample_speech_file = "./devtest_files/audio/SetA_G3_SummerFun_02.mp3";
  const speech_record = fs.createReadStream(sample_speech_file);

  // console.log(speech_record);

  // const openai = new OpenAIApi(configuration);
  // const resp = openai.createTranscription(
  //   fs.createReadStream(sample_audio_file),
  //   "whisper-1"
  // );

  // console.log(resp);

  return (
    <div>
      <p>Whisper</p>
    </div>
  );
}
