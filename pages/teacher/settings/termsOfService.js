import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import TextContainer from "@/components/TextContainer";
import BackButton from "@/components/BackButton";

export default function TermsOfService() {
  const title = "Settings";
  const subtitle = "Terms of Service";
  const subsection = "Agreement to Terms";
  const date = "Last Updated: "; // + new Date().toLocaleString() + ""

  return (
    <div className="p-12 md:px-24 pt-8">
      <div className="flex flex-row flex-start gap-1">
        <BackButton />
      </div>

      {/* Title */}
      <div className="flex flex-col py-2 mt-8 mb-4">
        <div className="">
          <p className="text-2xl font-normal">{title}</p>
        </div>
        {/* Logout Button */}
        <div className="mt-16">
          <p className="text-2xl font-extrabold">{subtitle}</p>
          {/* TODO: get date from database */}
          <p>{date}</p>
        </div>
      </div>

      {/* Text Content from Database */}
      <div className="mt-12">
        <p className="text-xl font-bold">{subsection}</p>
      </div>

      <TextContainer></TextContainer>
    </div>
  );
}
