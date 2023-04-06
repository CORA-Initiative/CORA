import Container from "@/components/Container";
import Toggle from "../../components/toggle/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "@/components/searchBox/SearchBox";
// import "tw-elements";
import Link from "next/link";

export default function dashboard() {
  const user = "Jose Andres M. Luna";
  const role = "Teacher";
  const school = "Miagao Elementary School";
  const year = 2023;

  const results = true;

  return (
    <div className="p-12 pt-4">
      <div className="flex py-2 flex-row justify-between mt-6 mb-10">
        <div className="w-3/4 flex flex-row gap-6">
          <div className="flex items-center overflow-hidden  text-cyan-600">
            <FontAwesomeIcon icon={faUser} size="2xl" />
          </div>

          <div className="">
            <p className="text-2xl font-bold">{user}</p>
            <p className="text-l">
              {role}, {school}, SY {year}-{year + 1}
            </p>
          </div>
        </div>
        <Link href="/teacher/settings/settings">
          <button className="flex align-start">
            <FontAwesomeIcon icon={faGear} size="xl" />
          </button>
        </Link>
      </div>

      {/* SECTIONS*/}
      {/* Search section box */}
      <SearchBox text="Search section"></SearchBox>
      <div className="flex-1 mt-4">
        {/* Table header */}
        <table className="table-auto md:table-fixed w-full text-md text-left">
          <thead>
            <tr className="border-b-4 border-black text-lg">
              <th>Grade</th>
              <th>Name</th>
              <th>Took Pre-test</th>
              <th>Took Post test</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>

          {!results && (
            <p className="text-orange-500 font-bold py-2 underline">
              {" "}
              No results found.
            </p>
          )}

          {results && (
            <tbody>
              <tr>
                <td>2</td>
                <td>Sampaguita</td>
                <td>0</td>
                <td>0</td>
                <td>25</td>
                <td className="py-4">
                  <div className="flex flex-col justify-center gap-2">
                    <Link href="/teacher/classDetails">
                      <button className="font-bold p-2 rounded-md bg-cyan-600 text-white border-2 border-cyan-600 text-sm">
                        View Summary
                      </button>
                    </Link>
                    {/* <button className="font-bold p-2 rounded-md bg-white text-cyan-600 border-2 border-cyan-600 text-sm">
                      Add Student
                    </button> */}
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      {/* Search students & Passage Accessibility */}
      <div className="flex flex-row gap-12 mt-10 justify-between">
        {/* Search student box */}
        <div className="w-1/2">
          <SearchBox text="Search student"></SearchBox>
          <div className="mt-4 w-full">
            {/* Table header */}
            <table className="table-auto md:table-fixed w-full text-md text-left">
              <thead>
                <tr className="border-b-4 border-black text-md">
                  <th>Name</th>
                  <th>Grade</th>
                  <th>Section</th>
                </tr>
              </thead>
              {!results && (
                <p className="text-orange-500 font-bold py-2 underline">
                  {" "}
                  No results found.
                </p>
              )}

              {results && (
                <tbody>
                  <tr>
                    <td className="py-2">Juan dela Cruz</td>
                    <td>2</td>
                    <td>Sampaguita</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
        {/* Passage Accessibility */}
        <div class=" w-1/3 flex flex-col gap-2">
          <p className="text-xl font-bold mr-3 text-orange-600 ">
            Passages Accessibility
          </p>
          <div>
            <label
              class="inline-block mr-5 hover:cursor-pointer text-lg font-bold"
              for="flexSwitchCheckDefault"
            >
              Pre-test
            </label>
            <input
              class="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[rgba(0,0,0,0.25)] outline-none before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-[0_0px_5px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-cyan-600 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
              type="checkbox"
              role="switch"
              id="togglePosttestAccess"
            />
          </div>
          <div>
            <label
              class="inline-block mr-5 hover:cursor-pointer text-lg font-bold"
              for="togglePretestAccess"
            >
              Post test
            </label>
            <input
              class="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[rgba(0,0,0,0.25)] outline-none before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-[0_0px_5px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-cyan-600 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
              type="checkbox"
              role="switch"
              id="togglePosttestAccess"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
