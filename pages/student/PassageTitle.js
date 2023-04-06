import React from "react";
import BackButton from "@/components/BackButton";

export default function passageTitle({
  test_type = "Pre-test",
  grade = 2,
  title = "Liquids Good for You",
  instructions = "Do you want to know the liquids that are good for your health? Read the next selection.",
}) {
  return (
    <div className="p-12 md:px-16 pt-8">
      {/* Back button */}
      <BackButton />
      {/* Main Content */}
      <div className="flex flex-col gap-24 items-center p-12 px-40 text-center">
        <div className="flex flex-col font-bold text-xl items-center">
          <p>Oral Reading {test_type}</p>
          <p>Grade {grade}</p>
        </div>
        <h1 className="font-bold text-8xl">{title}</h1>
        <p className="text-lg">{instructions}</p>
        <button className="p-4 px-32 bg-coraBlue-1 rounded-lg text-coraWhite text-xl uppercase font-bold">
          Start Reading
        </button>
      </div>
    </div>
  );
}
