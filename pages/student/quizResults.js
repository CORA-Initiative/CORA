import React from "react";
import BackButton from "@/components/BackButton";
import Link from "next/link";

export default function quizResults({
  test_type = "Pre-Test",
  passage_title = "Liquids Good For You",
  score = 2,
  total_quiz_items = 7,
}) {
  return (
    <div className="flex flex-col p-12 md:px-16 pt-8 gap-6">
      {/* Back button */}
      <BackButton />

      <div className="flex flex-col gap-24">
        <div className="flex flex-col text-center gap-2">
          <h2 className="text-3xl font-bold">{test_type} Quiz Results</h2>
          <p className="text-lg">{passage_title}</p>
        </div>

        <div className="text-center text-gray-800">
          <p className="text-xl">You completed the {test_type} Quiz!</p>
          <p className="text-lg">You got</p>
        </div>

        <div className="text-center flex flex-col gap-4">
          <h1 className="font-bold text-6xl">
            {score}/{total_quiz_items}
          </h1>
          <p>We may need some practice, kid.</p>
        </div>

        <div className="flex flex-col items-center mt-4">
          <Link href="/student/dashboard">
            <button className="bg-coraBlue-1 py-4 px-20 text-coraWhite text-xl font-bold rounded-lg hover:bg-cyan-700">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
