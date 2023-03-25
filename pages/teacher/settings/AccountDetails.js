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

export default function AccountDetails() {
  const title = "Settings";
  const subtitle = "Account Details";
  const nameHolder = "Jose Andres M. Luna";
  const emailHolder = "jal@school.com.ph";
  const teacherIDHolder = "ABC012345";
  const passwordHolder = "*******";

  

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
        <div className="flex flex-col py-2 mt-8 mb-4">
            <div className="">
                <p className="text-2xl font-normal">{title}</p>
            </div>
            {/* Logout Button */}
            <div className="mt-16">
                <p className="text-2xl font-extrabold">{subtitle}</p>
            </div>
        </div>

        {/* Account Details */}
        <div>
            <table className="table-fixed">
            <thead>
                <tr>
                <th class="w-1/8 px-4 py-2"></th>
                <th class="w-1/2 px-4 py-2"></th>
                </tr>
            </thead>
                <tbody className="">
                    <tr>
                        <td className="px-0 py-4">Name</td>
                        <td className="px-4 py-2 font-bold">{nameHolder}</td>
                    </tr>
                    <tr>
                        <td className="px-0 py-2">Email</td>
                        <td className="px-4 py-2 font-bold">{emailHolder}</td>
                    </tr>
                    <tr>
                        <td className="px-0 py-2">Teacher ID</td>
                        <td className="px-4 py-2 font-bold">{teacherIDHolder}</td>
                    </tr>
                    <tr>
                        <td className="px-0 py-2">Password</td>
                        <td className="px-4 py-2 font-bold">{passwordHolder}</td>
                    </tr>
                </tbody>
            </table>
        </div>

       
        <div className="mt-12">
            <button className="px-10 py-1 text-coraBlue-1 font-bold text-lg outline outline-coraBlue-1 rounded hover:outline-coraBlue-4 hover:text-coraBlue-4">Edit</button>
        </div>

    </div>
  );
}