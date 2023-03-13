import React from "react";
// import { useAuth } from "../context/AuthContext";
import Container from "@/components/Container";
import Toggle from "../../../components/toggle/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt, faUser, faChevronLeft, faLock, faFileText, faPhone} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import SearchBox from "@/components/searchBox/SearchBox";
// import { IconButton } from "@material-tailwind/react";

// import "tw-elements";

export default function Settings() {
  const title = "Settings";

  //const { logout, currentUser } = useAuth();
  //console.log(currentUser);

  return (
    <div className="p-12 md:px-24 pt-8">
        <div className="flex flex-row flex-start gap-1">
            <button>
                <FontAwesomeIcon icon={faChevronLeft} size="md" /> Back
            </button>
        </div>

        {/* Title */}
        <div className="flex justify-between py-2 mt-8 mb-10">
            <div className="">
                <p className="text-2xl font-extrabold">{title}</p>
            </div>
            {/* Logout Button */}
            <div className="">
                <button className="px-10 py-1 text-white font-bold text-lg bg-cyan-600 rounded hover:bg-cyan-900">Logout</button>
            </div>
        </div>

        {/* <div className="flex flex-col items-center justify-center">
            <button onClick={logout}>Logout</button>
        </div> */}

        {/* Other settings */}
        <div className="flex flex-row mt-16 grid grid-cols-3 gap-10 md:mr-72">
            <button className="flex flex-col p-6 gap-y-3 items-center outline rounded text-cyan-600 hover:text-cyan-800">
                <span><FontAwesomeIcon icon={faListAlt} size="2xl" /></span>
                Account Details
            </button>

            <button className="flex flex-col p-6 gap-y-3 items-center outline rounded text-cyan-600 hover:text-cyan-800">
                <span><FontAwesomeIcon icon={faUser} size="2xl" /></span>
                Change Profile Picture
            </button>

            <button className="flex flex-col p-6 gap-y-3 items-center outline rounded text-cyan-600 hover:text-cyan-800">
                <span><FontAwesomeIcon icon={faLock} size="2xl" /></span>
                Privacy Policy
            </button>

            <button className="flex flex-col p-6 gap-y-3 items-center outline rounded text-cyan-600 hover:text-cyan-800">
                <span><FontAwesomeIcon icon={faFileText} size="2xl" /></span>
                Terms of Service
            </button>

            <button className="flex flex-col p-6 gap-y-3 items-center outline rounded text-cyan-600 hover:text-cyan-800">
                <span><FontAwesomeIcon icon={faPhone} size="2xl" /></span>
                Contact Us
            </button>
        </div>
 
    </div>
  );
}