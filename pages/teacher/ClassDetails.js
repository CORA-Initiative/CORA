import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function ClassDetails() {
  const grade_level = 2;
  const section_name = "Sampaguita";
  return (
    <>
      <div className="p-4 border flex flex-row flex-start gap-1">
        <button>
          <FontAwesomeIcon icon={faChevronLeft} size="md" />
        </button>
        <p>Back</p>
      </div>
      <div className="flex justify-center border">
        <p className="font-bold text-3xl">
          Grade {grade_level} - {section_name}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row">
        {/* Section Details */}
        <div class="grid grid-cols-3 gap-4 px-16 py-8 border">
          <p class="col-span-3 font-bold text-lg text-cyan-700">
            Class Details
          </p>
          <div class="...">School Name</div>
          <div class="col-span-2 ... font-bold">Miagao Elementary School</div>
          <div class="...">Grade Level</div>
          <div class="col-span-2 ... font-bold">2</div>
          <div class="...">Section Name</div>
          <div class="col-span-2 ... font-bold">Sampaguita</div>
          <div class="...">Total</div>
          <div class="col-span-2 ... font-bold">20 students</div>
        </div>
        {/* Results Summary*/}
        <div className="flex-1 p-4 px-12">
          <table class="table-fixed w-full text-md  border-separate border-spacing-4 text-left">
            <thead>
              <tr>
                <th className=" text-cyan-700">Results Summary</th>
                <th>Pre-test</th>
                <th>Post test</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Frustation</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Instructional</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Independent</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* List of Students */}
      <div className="flex flex-row flex-1 py-8 px-16 justify-between">
        <p className="text-2xl font-bold">List of students</p>
        <div class="w-1/2 border-2 border-cyan-700 rounded-md overflow-clip">
          <input
            type="text"
            className="w-full pl-4 p-2"
            id="exampleFormControlInputText"
            placeholder="Search students"
          />
        </div>
      </div>
      <div className="flex flex-1 px-12">
        <table class="table-fixed w-full text-md border-separate border-spacing-4 text-left">
          <thead>
            <tr className="">
              <th>#</th>
              <th>Name</th>
              <th>Pre-Test Profile</th>
              <th>Post-Test Profile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Juan Dela Cruz</td>
              <td>Frustation</td>
              <td>Instructional</td>
              <td>
                <button className="underline">View</button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Juan Dela Cruz</td>
              <td>Frustation</td>
              <td>Instructional</td>
              <td>
                <button className="underline">View</button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Juan Dela Cruz</td>
              <td>Frustation</td>
              <td>Instructional</td>
              <td>
                <button className="underline">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
