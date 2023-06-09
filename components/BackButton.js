import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-1">
      <button className="text-lg" type="button" onClick={() => router.back()}>
        <FontAwesomeIcon icon={faChevronLeft} size="sm" /> Back
      </button>
    </div>
  );
}
