const fs = require("fs");
const { Readable } = require("stream");

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "",
});

// Function to transcribe the text from audio
async function transcribeText(audioPath) {
    const openai = new OpenAIApi(configuration);
    const transcript = await openai.createTranscription(
        fs.createReadStream(audioPath), // audio input file
        "whisper-1", // Whisper model name. 
        "en" // ISO language code. Eg, for english `en`
    );

    const output = transcript.data.text;
    console.log(output);

    return output;
}

// const audioPath = "C:/Users/daize/Documents/Cleaned_Pretest_Grade5_1.wav";
// const transcribedTextResult = transcribe(audioPath);