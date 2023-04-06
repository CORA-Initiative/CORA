import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function studentProfile() {
  return (
    <div className="p-12 pt-4">
      <div className="p-4 flex flex-row flex-start gap-1">
        <button>
          <FontAwesomeIcon icon={faChevronLeft} size="md" /> Back
        </button>
      </div>
      <div className="flex justify-center">
        <p className="font-bold text-3xl">Student Profile</p>
      </div>

      <div className="flex flex-col">
        {/* Student Details */}
        <div className="flex flex-1 py-8 px-12">
          <table class="table-fixed w-1/2 text-md text-left">
            <thead>
              <tr>
                <th>Name</th>
                <td className="uppercase">DELA CRUZ, JUAN</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Grade Level & Section</th>
                <td className="uppercase">2 - Sampaguita</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pre-Test Results */}
        <div className="flex flex-col p-12 border-t-4 border-cyan-600 gap-10 ">
          <table class="table-fixed text-md text-left w-1/2">
            <tr>
              <th>Pre-Test Passage</th>
              <td className="uppercase">Liquids Good For You</td>
            </tr>
            <tr>
              <td>Date Taken</td>
              <td>June 7, 2022</td>
            </tr>
          </table>
          <table class="table-fixed w-full text-md text-left">
            <thead>
              <tr>
                <td></td>
                <th>Detail</th>
                <th>Percentage</th>
                <th>Profile Level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Word Reading Score</th>
                <td>0 miscues</td>
                <td>0%</td>
                <td>Frustation</td>
              </tr>
              <tr>
                <th>Comprehension Score</th>
                <td>0/0</td>
                <td>0%</td>
                <td>Frustation</td>
              </tr>
              <tr>
                <th>Reading Speed (words per minute, wpm)</th>
                <td>0.0 wpm</td>
              </tr>
            </tbody>
          </table>
          <table class="table-fixed text-md text-left w-1/2">
            <tr>
              <th>Oral Reading Profile</th>
              <td className="uppercase font-bold underline">Frustation</td>
            </tr>
          </table>
        </div>

        {/* Post-test Results */}
        {/* Pre-Test Results */}
        <div className="flex flex-col p-12 border-t-4 border-cyan-600 gap-10">
          <table class="table-fixed w-1/2 text-md text-left">
            <tr>
              <th>Post Test Passage</th>
              <td className="uppercase">Air and Sunlight</td>
            </tr>
            <tr>
              <td>Date Taken</td>
              <td>February 7, 2023</td>
            </tr>
          </table>
          <table class="table-fixed w-full text-md text-left">
            <thead>
              <tr>
                <td></td>
                <th>Detail</th>
                <th>Percentage</th>
                <th>Profile Level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Word Reading Score</th>
                <td>0 miscues</td>
                <td>0%</td>
                <td>Frustation</td>
              </tr>
              <tr>
                <th>Comprehension Score</th>
                <td>0/0</td>
                <td>0%</td>
                <td>Frustation</td>
              </tr>
              <tr>
                <th>Reading Speed (words per minute, wpm)</th>
                <td>0.0 wpm</td>
              </tr>
            </tbody>
          </table>
          <table class="table-fixed text-md text-left w-1/2">
            <tr>
              <th>Oral Reading Profile</th>
              <td className="uppercase font-bold underline">Frustation</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
