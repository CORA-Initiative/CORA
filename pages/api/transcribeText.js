// const fs = require("fs");
const { Readable } = require("stream");
const { Configuration, OpenAIApi } = require("openai");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const configuration = new Configuration({
      apiKey: process.env.WHISPER_API_KEY,
    });

    // Function to transcribe the text from audio
    async function transcribeText(audioStream) {
      const openai = new OpenAIApi(configuration);
      const transcript = await openai.createTranscription(
        audioStream, // Pass the audio stream directly
        "whisper-1", // Whisper model name
        "en" // ISO language code, e.g., for English `en`
      );

      const output = transcript.data.text;
      console.log(output);

      return output;
    }

    try {
      // Retrieve the audio file from the request body
      const formData = await req.formData();
      const audioFile = formData.get("audioFile");

      // Create a readable stream from the audio file
      const audioStream = new Readable();
      audioStream.push(audioFile);
      audioStream.push(null);

      // Transcribe the audio
      const transcribedTextResult = await transcribeText(audioStream);

      // Return the transcription result
      res.status(200).json({ result: transcribedTextResult });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred during transcription." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
