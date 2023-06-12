import React, { useEffect } from "react";

export default function getReadingProfile() {
  const evaluateOverallReadingProfile = () => {
    // Set comprehension profile
    const comprehensionScorePercentage = Math.round(
      (Number(sessionStorage.getItem("quiz_score")) /
        Number(sessionStorage.getItem("total_quiz_items"))) *
        100
    );

    console.log("comprehensionScorePercentage ", comprehensionScorePercentage);
    console.log(typeof comprehensionScorePercentage);

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

    console.log("readingScorePercentage: ", readingScorePercentage);
    console.log(typeof readingScorePercentage);

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

    console.log("RP: ", readingProfile);
    console.log("CP: ", comprehensionProfile);

    return overallReadingProfile;
  };

  useEffect(() => {
    console.log("==================================");

    sessionStorage.setItem("total_words_passage", 35);
    sessionStorage.setItem("number_of_miscues", 5);

    sessionStorage.setItem("quiz_score", 4);
    sessionStorage.setItem("total_quiz_items", 8);

    let RP = evaluateOverallReadingProfile();
    console.log("Overall Reading Profile: ", RP);
  });
  return <div>getReadingProfile</div>;
}
