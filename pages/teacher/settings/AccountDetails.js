import React from "react";
import BackButton from "@/components/BackButton";

export default function AccountDetails() {
  const title = "Settings";
  const subtitle = "Account Details";
  const nameHolder = "Jose Andres M. Luna";
  const emailHolder = "jal@school.com.ph";
  const teacherIDHolder = "ABC012345";
  const passwordHolder = "*******";

  return (
    <div className="p-12 md:px-24 pt-8">
      <BackButton />

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
        <button className="px-10 py-1 text-mainColor0 font-bold text-lg outline outline-mainColor0 rounded hover:outline-mainColor4 hover:text-mainColor4">
          Edit
        </button>
      </div>
    </div>
  );
}
