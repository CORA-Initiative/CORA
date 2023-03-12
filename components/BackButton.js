import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function BackButton() {
  return (
    <div className="flex flex-row gap-1">
      <button className="text-lg">
        <FontAwesomeIcon icon={faChevronLeft} size="md" /> BACK
      </button>
    </div>
  );
}
