import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "@/components/searchBox/SearchBox";

export default function classDetails({
  grade = 2,
  section = "Sampaguita",
  total = 20,
  school = "Miagao Elementary School",
  region = "Region VI",
}) {
  const grade_level = 2;
  const section_name = "Sampaguita";
  return (
    <div className="p-12 pt-8">
      <div className="flex flex-row flex-start gap-1 border">
        <button>
          <FontAwesomeIcon icon={faChevronLeft} size="md" />
        </button>
        <p>Back</p>
      </div>
      <div className="flex justify-center my-6">
        <p className="font-bold text-3xl">
          Grade {grade_level} - {section_name}
        </p>
      </div>
      {/* Results and other info */}
      <div className="mt-4 flex lg:w-2/3 flex-col md:flex-row  gap-8">
        {/* Results Summary*/}
        <div className="flex flex-col border-blue-600 gap-4">
          <p className="text-2xl font-bold">Results Summary</p>
          <table class="table-fixed w-full text-left">
            <thead>
              <tr className="border-b-4 border-black text-lg">
                <th className="border-r-2 border-black">Profile Level</th>
                <th className="text-orange-500 px-2">Pre-test</th>
                <th className="text-orange-500">Post test</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-r-2 border-black">Frustation</td>
                <td className="px-2">0</td>
                <td>0</td>
              </tr>
              <tr>
                <td className="border-r-2 border-black">Instructional</td>
                <td className="px-2">0</td>
                <td>0</td>
              </tr>
              <tr>
                <td className="border-r-2 border-black">Independent</td>
                <td className="px-2">0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* --------------------- Section Information */}
      <div class="flex flex-col w-full mt-8 lg:w-2/3 gap-4">
        <p class="font-bold text-2xl">Section Information</p>
        <div className="flex flex-row gap-10">
          {/* --------------------------2nd column */}
          <div className="flex flex-col w-1/2">
            <div className="flex justify-between">
              <label>Grade Level</label>
              <span className="font-bold">{grade}</span>
            </div>
            <div className="flex justify-between">
              <label>Section Name</label>
              <span className="font-bold">{section}</span>
            </div>
            <div className="flex justify-between ">
              <label>Student Total</label>
              <span className="font-bold">{total}</span>
            </div>
          </div>
          {/* --------------------------2nd column */}
          <div className="flex flex-col w-1/2">
            <div className="flex justify-between order-1">
              <label>Region</label>
              <span className="font-bold">{region}</span>
            </div>
            <div className="flex justify-between order-2">
              <label>School</label>
              <span className="font-bold">{school}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------List of Students */}
      <div className="flex flex-col justify-between mt-12">
        <SearchBox text="Search student"></SearchBox>

        <div className="flex flex-1 ">
          <table class="mt-4 table-fixed w-full text-md text-left">
            <thead>
              <tr className="border-b-4 border-black">
                <th>#</th>
                <th>Name</th>
                <th>Pre-Test Profile</th>
                <th>Post-Test Profile</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Juan Dela Cruz</td>
                <td>Frustation</td>
                <td>Instructional</td>
                <td className="text-center">
                  <button className="underline">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
