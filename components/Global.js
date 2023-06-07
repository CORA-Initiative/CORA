import React from "react";

export default function globalAlignment(sentence1, sentence2) {
  sentence1 = sentence1
    .replace(/[^\w\s\']|_/g, "")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .split(" ");
  sentence2 = sentence2
    .replace(/[^\w\s\']|_/g, "")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .split(" ");

  console.log(sentence1);
  console.log(sentence2);

  sentence2 = sentence2.filter((word) => {
    return word !== "";
  });

  console.log("Cleaned text", sentence2);
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
