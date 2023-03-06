import Container from "@/components/Container";
import Toggle from "../../components/toggle/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

// import "tw-elements";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-1 px-12 py-6 flex-row justify-between gap-2 border">
        <div className=" w-1/3">
          <p className="text-4xl font-bold">Hello, Jose.</p>
          <p className="text-xl">Welcome to CORA!</p>
        </div>
        <button className="border flex align-start">
          <FontAwesomeIcon icon={faGear} size="2xl" />
        </button>
      </div>
      <div class="mx-12 border-2 border-cyan-500 rounded-md overflow-clip">
        <input
          type="text"
          className="w-full pl-4 p-2"
          id="exampleFormControlInputText"
          placeholder="Search students"
        />
      </div>
      {/* SECTIONS*/}
      <div className="flex-1 p-4 pl-12">
        <p className="text-3xl font-bold mr-3">Sections</p>
        {/* Table header */}
        <table class="table-fixed  w-full text-lg  border-separate border-spacing-4 text-left">
          <thead>
            <tr>
              <th>Grade</th>
              <th>Name</th>
              <th>Pre-test</th>
              <th>Post test</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2</td>
              <td>Sampaguita</td>
              <td>0</td>
              <td>0</td>
              <td>25</td>
              <td>
                <div className="flex flex-col justify-center gap-1">
                  <button className="font-bold p-1 rounded-md bg-cyan-600 text-white border-2 border-cyan-600 text-sm">
                    View Summary
                  </button>
                  <button className="font-bold p-1 rounded-md bg-white text-cyan-600 border-2 border-cyan-600 text-sm">
                    Add Student
                  </button>
                </div>
              </td>
            </tr>
            <tr className="border border-slate-600">
              <td>3</td>
              <td>Bonifacio</td>
              <td>0</td>
              <td>0</td>
              <td>25</td>
              <td>
                <div className="flex flex-col justify-center align-center gap-1">
                  <button className="font-bold p-1 rounded-md bg-cyan-600 text-white border-2 border-cyan-600 text-sm">
                    View Summary
                  </button>
                  <button className="font-bold p-1 rounded-md bg-white text-cyan-600 border-2 border-cyan-600 text-sm">
                    Add Student
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex flex-1 flex-col p-4 pl-12 gap-6">
        <p className="text-3xl font-bold mr-3">Passages Accessibility</p>
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
    </>
  );
}
