const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');

// Function to calculate the reading speed of students
function calculateReadingSpeed(audioPath, transcribedText) {
    const cleanedText = transcribedText.toLowerCase().replace(/[^a-zA-Z ]/g, "");
    const totalWords = cleanedText.split(' ').length;

    return ffprobe(audioPath, { path: ffprobeStatic.path })
        .then((info) => {
            const duration = info.streams[0].duration;
            const readingSpeed = (totalWords / duration) * 60;
            return readingSpeed;
        })
        .catch((err) => {
            console.error(err);
        });
}

// Example usage:
// TODO: change audioPath and transcribedText value
// const audioPath = 'C:/Users/daize/OneDrive/Documents/miscue/Cleaned_Pretest_Grade5_1.wav';
// const transcribedText = "The quick brown fox";

// calculateReadingSpeed(audioPath, transcribedText)