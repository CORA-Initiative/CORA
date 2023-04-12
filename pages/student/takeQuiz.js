import React from "react";
import BackButton from "@/components/BackButton";
import Link from "next/link";

export default function takeQuiz({
  test_type = "Pre-Test",
  passage_title = "Liquids Good For You",
}) {
  return (
    <div className="flex flex-col p-12 md:px-16 pt-8 gap-8">
      {/* Back button */}
      <BackButton />

      <div className="flex flex-col text-center gap-2">
        <h2 className="text-3xl font-bold">{test_type} Quiz</h2>
        <p className="text-lg">{passage_title}</p>
      </div>
      {/* Questions */}
      <div className="flex flex-col mx-8 md:mx-16 lg:mx-60">
        {/** Single question */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Question #</h2>
          <p className="text-lg">This is a question?</p>

          <form>
            <div className="flex flex-row gap-2">
              {" "}
              <input
                type="radio"
                id={`q1o1`}
                name="fav_language"
                value="HTML"
                onChange={() => "hh"}
              />
              <label>HTML</label>
            </div>
            <div className="flex flex-row gap-2">
              {" "}
              <input
                type="radio"
                id={`q1o1`}
                name="fav_language"
                value="HTML"
                onChange={() => "hh"}
              />
              <label>HTML</label>
            </div>
          </form>
        </div>
      </div>

      {/* Submit button */}
      <div className="flex flex-col items-center mt-4">
        <Link href="/student/dashboard">
          <button className="bg-coraBlue-1 py-4 px-20 text-coraWhite text-xl font-bold rounded-lg hover:bg-cyan-700">
            Submit Answers
          </button>
        </Link>
      </div>
    </div>
  );
}
