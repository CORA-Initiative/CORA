// Function to calculate the reading speed of students
export default function calculateReadingSpeed(audioTime, transcribedText) {
  const cleanedText = transcribedText
    .replace(/[^\w\s\']|_/g, "")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .split(" ");
  const totalWords = cleanedText.length;

  const readingSpeed = (totalWords / audioTime) * 60;
  console.error(readingSpeed);
  return readingSpeed;
}
