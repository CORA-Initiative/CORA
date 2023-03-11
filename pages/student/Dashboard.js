import React from "react";
import ReadingProfileSummary from "@/components/studentDashboard/ReadingProfileSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGear } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard({ user }) {
  return (
    <div className="p-12 md:px-24 pt-8">
      <div className="flex py-2 flex-row justify-between mt-6 mb-10">
        <div className="w-3/4 flex flex-row gap-6">
          <div className="flex items-center overflow-hidden  text-cyan-600">
            <FontAwesomeIcon icon={faUser} size="2xl" />
          </div>
          <div className="">
            <p className="text-2xl font-bold">HELLO, JUAN!</p>
            <p className="text-l">Welcome to CORA</p>
          </div>
        </div>
        <button className=" flex align-start">
          <FontAwesomeIcon icon={faGear} size="xl" />
        </button>
      </div>
      {/* Main Content */}
      <div className="w-full border flex flex-col md:flex-row justify-between gap-20">
        <ReadingProfileSummary></ReadingProfileSummary>
        <ReadingProfileSummary></ReadingProfileSummary>
      </div>
    </div>
  );
}
