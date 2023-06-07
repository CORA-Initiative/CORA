import path from 'path';
import formidable from 'formidable';
import fs from 'fs';
import axios from 'axios';
import calculateReadingSpeed from "@/components/ReadingSpeed";
import Link from "next/link";
import { getAudioDuration } from '@/components/AudioDuration';

export const config = {
  api: {
    bodyParser: false, // Disable the built-in bodyParser
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    const formData = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ fields, files });
      });
    });
   
    const fileName = formData.fields.audioName;
    // Get the audio URL
    const audioURL = formData.fields.audioURL;
    // console.log(audioURL);

    // Save and download the audio to the public folder
    const downloadAndSaveAudio = async (url, outputPath) => {
      try {
        const response = await axios({
          url,
          method: 'GET',
          responseType: 'stream',
        });

        const outputStream = fs.createWriteStream(outputPath);
        response.data.pipe(outputStream);

        return new Promise((resolve, reject) => {
          outputStream.on('finish', () => {
            console.log('Audio downloaded and saved successfully.');
            resolve();
          });

          outputStream.on('error', (error) => {
            console.error('Error saving audio:', error);
            reject(error);
          });
        });
      } catch (error) {
        console.error('Error downloading audio:', error);
        throw error;
      }
    };



    // Define the public folder path
    const savePath = "public/"+fileName;

    // Send the audio to Whisper API
    try {
      await downloadAndSaveAudio(audioURL, savePath);

      const { Configuration, OpenAIApi } = require('openai');
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const openai = new OpenAIApi(configuration);

      async function transcribeAudio(savePath) {
        try {
          const resp = await openai.createTranscription(
            fs.createReadStream(savePath),
            'whisper-1',
            'en'
          );
          console.log(resp.data);
          return resp.data; // Return the transcription result

        } catch (error) {
          console.error('Transcription error:', error);
          throw error;
        }
      }


      
      try {
        const transcriptionResult = await transcribeAudio(savePath);
        res.status(200).json({ status: 'ok', transcription: transcriptionResult});

      } catch (error) {
        console.error('[sent] An error occurred while transcribing audio:', error);
        res.status(405).json({ error });
      }
    } catch (error) {
      console.error('[sent] An error occurred while downloading audio:', error);
      res.status(405).json({ error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
