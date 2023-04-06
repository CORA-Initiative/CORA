import React from "react";
// import { useAuth } from "../context/AuthContext";
import Container from "@/components/Container";
import Toggle from "../../../components/toggle/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import TextContainer from "@/components/TextContainer";
import BackButton from "@/components/BackButton";

export default function privacyPolicy() {
  const title = "Settings";
  const subtitle = "Privacy Policy";

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
        </div>
      </div>
      {/* TODO: get data from database */}
      <TextContainer></TextContainer>
    </div>
  );
}
