import React from "react";
// import { useAuth } from "../context/AuthContext";
import Container from "@/components/Container";
import Toggle from "../../../components/toggle/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin, faEnvelope, faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import SearchBox from "@/components/searchBox/SearchBox";
// import { IconButton } from "@material-tailwind/react";

// import "tw-elements";

export default function ContactUs() {
    const title = "Settings";
    const subtitle = "Contact Us";
    const address = "Miagao, Iloilo, Philippines";
    const email = "cora_ph@gmail.com";
    const heading1 = "Got a question?";
    const heading2 = "We’re here to help and answer any question you might have. We look forward to hearing from you.";

    return (
        <div className="p-12 md:px-24 pt-8">
            <div className="flex flex-row flex-start gap-1">
                <button>
                    <FontAwesomeIcon icon={faChevronLeft} size="md" /> Back
                </button>
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

            {/* Contact Details */}
            <div className="flex flex-col">
                <p className="text-lg font-semibold">{heading1}</p>
                <p className="">{heading2}</p>
                <div className="flex flex-row gap-x-8 mt-8 text-lg">
                    <div className="text-coraOrange">
                        <FontAwesomeIcon icon={faMapPin} size="md" />
                    </div>
                    <p>{address}</p>
                </div>

                <div className="flex flex-row gap-x-6 mt-4 text-lg">
                    <div className="text-coraOrange">
                        <FontAwesomeIcon icon={faEnvelope} size="md" />
                    </div>
                    {/* TODO: Put link that will automatically open user's email app */}
                    <p>{email}</p>
                </div>
    
            </div>
    
        </div>
  );
}