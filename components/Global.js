import React from "react";

export default function globalAlignment(reference, transcription) {
  // Cleans and converts the sentences into an array
  function cleanText(text) {
    const lowerText = text.toLowerCase();
    const alphanumericText = lowerText.replace(/[^a-zA-Z0-9\s]/g, "");
    const cleanedText = alphanumericText.replace(/\s{2,}/g, " ");
    const splitText = cleanedText.split(" ");
    return splitText;
  }

  // Made to replace specific transcribed words that would never (or less likely) to match with the reference words (e.g., Jacky and Jackie)
  function replaceWords(words, replacements) {
    // Iterate over each word in the array
    const replacedWords = words.map((word) => {
      // Check if the word is in the replacements object
      if (replacements.hasOwnProperty(word)) {
        // Replace the word if it matches a key in the replacements object
        return replacements[word];
      }
      // Keep the word unchanged if it doesn't match any key
      return word;
    });

    return replacedWords;
  }
  // The replacement object that contains all words to look out for and their corresponding replacements
  const replacements = {
    jackie: "jacky",
  };

  // Made to split separate words (in the Phil-IRI) that was conjoined by Whisper during transcription (e.g., window sill --> windowsill)
  function splitWords(words, splitRules) {
    const splittedWords = words
      .map((word) => {
        if (splitRules[word]) {
          return splitRules[word];
        }
        return word;
      })
      .flat();

    return splittedWords;
  }
  // The split rules objects that serves as basis on what words to split and how to split them
  const splitRules = {
    windowsill: ["window", "sill"],
  };

  console.log("Raw reference text", reference);
  let sentence1 = cleanText(reference);
  console.log("Cleaned reference text", sentence1);

  console.log("Raw transcribed text", transcription);

  let sentence2 = cleanText(transcription);
  sentence2 = sentence2.filter((word) => {
    return word !== "";
  });
  sentence2 = replaceWords(sentence2, replacements);
  sentence2 = splitWords(sentence2, splitRules);

  console.log("Cleaned transcribed text", sentence2);

  // initialize a 2D array to store the scores
  const score = [];
  for (let i = 0; i <= sentence1.length; i++) {
    score[i] = [];
    for (let j = 0; j <= sentence2.length; j++) {
      score[i][j] = 0;
    }
  }

  // initialize the first row and column of the score matrix
  for (let i = 1; i <= sentence1.length; i++) {
    score[i][0] = i;
  }
  for (let j = 1; j <= sentence2.length; j++) {
    score[0][j] = j;
  }

  // fill the score matrix
  for (let i = 1; i <= sentence1.length; i++) {
    for (let j = 1; j <= sentence2.length; j++) {
      const deletion = score[i - 1][j] + 1;
      const insertion = score[i][j - 1] + 1;
      const match =
        score[i - 1][j - 1] + (sentence1[i - 1] === sentence2[j - 1] ? 0 : 1);
      score[i][j] = Math.min(deletion, insertion, match);
    }
  }

  // trace back the optimal alignment
  let i = sentence1.length;
  let j = sentence2.length;
  let numInsertions = 0;
  let numDeletions = 0;
  let numSubstitutions = 0;
  while (i > 0 || j > 0) {
    if (i > 0 && score[i][j] === score[i - 1][j] + 1) {
      numDeletions++;
      i--;
    } else if (j > 0 && score[i][j] === score[i][j - 1] + 1) {
      numInsertions++;
      j--;
    } else {
      if (sentence1[i - 1] !== sentence2[j - 1]) {
        numSubstitutions++;
      }
      i--;
      j--;
    }
  }

  // return the number of insertions, deletions, and substitutions
  return {
    numInsertions,
    numDeletions,
    numSubstitutions,
  };
}
