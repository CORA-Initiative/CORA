import React from "react";
// import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListAlt,
  faUser,
  faLock,
  faFileText,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/router";

export default function Settings() {
  const title = "Teacher Settings";

  //const { logout, currentUser } = useAuth();
  //console.log(currentUser);
  const router = useRouter();

  return (
    <div className="p-12 md:px-24 pt-8">
      <div className="flex flex-row flex-start gap-1">
        <BackButton />
      </div>

      {/* Title */}
      <div className="flex justify-between py-2 mt-8 mb-10">
        <div className="">
          <p className="text-2xl font-bold">{title}</p>
        </div>
        {/* Logout Button */}
        <div className="">
          <button className="px-10 py-1 text-white font-bold text-lg bg-cyan-600 rounded hover:bg-cyan-900">
            Logout
          </button>
        </div>
      </div>

      {/* <div className="flex flex-col items-center justify-center">
            <button onClick={logout}>Logout</button>
        </div> */}

      {/* Other settings */}
      <div className="mt-16 grid grid-cols-3 gap-10 md:mr-72 w-full border">
        <button
          onClick={() => router.push("/teacher/settings/accountDetails")}
          className="flex flex-col p-6 gap-y-3 items-center outline rounded text-cyan-600 hover:text-cyan-800"
        >
          <span>
            <FontAwesomeIcon icon={faListAlt} size="2xl" />
          </span>
          Account Details
        </button>

        <button
          onClick={() => router.push("/teacher/settings/changeProfile")}
          className="flex flex-col p-6 gap-y-3 items-center outline rounded text-cyan-600 hover:text-cyan-800"
        >
          <span>
            <FontAwesomeIcon icon={faUser} size="2xl" />
          </span>
          Change Profile Picture
        </button>

        <button
          onClick={() => router.push("/teacher/settings/privacyPolicy")}
          className="flex flex-col p-6 gap-y-3 items-center outline rounded text-cyan-600 hover:text-cyan-800"
        >
          <span>
            <FontAwesomeIcon icon={faLock} size="2xl" />
          </span>
          Privacy Policy
        </button>

        <button
          onClick={() => router.push("/teacher/settings/termsOfService")}
          className="flex flex-col p-6 gap-y-3 items-center outline rounded text-cyan-600 hover:text-cyan-800"
        >
          <span>
            <FontAwesomeIcon icon={faFileText} size="2xl" />
          </span>
          Terms of Service
        </button>

        <button
          onClick={() => router.push("/teacher/settings/contactUs")}
          className="flex flex-col p-6 gap-y-3 items-center outline rounded text-cyan-600 hover:text-cyan-800"
        >
          <span>
            <FontAwesomeIcon icon={faPhone} size="2xl" />
          </span>
          Contact Us
        </button>
      </div>
    </div>
  );
}