import React from "react";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import { thisUser } from "@/context/UserContext";

export default function passageTitle({}) {
  const user = thisUser();

  return (
    <div className="p-12 md:px-16 pt-8">
      {/* Back button */}
      <BackButton />
      {/* Main Content */}
      <div className="flex flex-col gap-24 items-center p-12 px-40 text-center">
        <div className="flex flex-col font-bold text-xl items-center">
          <p>Oral Reading {user.passage.type}</p>
          <p>Grade {user.passage.grade_level}</p>
        </div>
        <h1 className="font-bold text-8xl">{user.passage.title}</h1>
        <p className="text-lg">{user.passage.instruction}</p>
        <Link href="/student/passageReading">
          <button className="p-4 px-32 bg-coraBlue-1 rounded-lg text-coraWhite text-xl uppercase font-bold">
            Start Reading
          </button>
        </Link>
      </div>
    </div>
  );
}
