import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "@/components/SearchBox/SearchBox";
import Link from "next/link";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDoc,
  doc,
  getDocs,
  orderBy,
  updateDoc,
  getCountFromServer,
} from "firebase/firestore";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

export default function dashboard() {
  const router = useRouter();

  // Teacher details
  const [name, setName] = useState();
  const [role, setRole] = useState();
  const [isPretestEnabled, setIsPretestEnabled] = useState();
  const [isPosttestEnabled, setIsPosttestEnabled] = useState();
  const [teacherDocID, setTeacherDocID] = useState();

  // Get school details
  const [school, setSchool] = useState("");
  const [schoolYear, setSchoolYear] = useState("20xx-20xx");

  const [sections, setSections] = useState([]);

  const results = true;
  const [searchStudents, setSearchStudents] = useState([]);
  const [searchSections, setSearchSections] = useState([]);

  const [pretestProfileCounts, setPretestProfileCounts] = useState({
    frustation: 0,
    instructional: 0,
    independent: 0,
  });

  const [posttestProfileCounts, setPosttestProfileCounts] = useState({
    frustation: 0,
    instructional: 0,
    independent: 0,
  });

  // DATA RETRIEVERS
  const getSchoolData = async (schoolRefID) => {
    const schoolRef = doc(db, "school", schoolRefID);
    try {
      const schoolSnap = await getDoc(schoolRef);

      if (schoolSnap.exists()) {
        let school = schoolSnap.data();

        // console.log(school);
        sessionStorage.setItem("school_region", String(school.region));
        sessionStorage.setItem("school_name", school.name);
        sessionStorage.setItem("school_year", school.school_year);
        setSchool(school.name);
        setSchoolYear(school.school_year);
      } else {
        console.log("No document found.");
      }
    } catch (e) {
      console.log("Error getting school document.");
    }
  };

  const getTeacherAndSchoolData = async () => {
    const teachersRef = collection(db, "teachers");
    const teachersQuery = query(
      teachersRef,
      where("email", "==", sessionStorage.getItem("teacher_id"))
    );
    const teacherSnapshot = await getDocs(teachersQuery);

    let schoolRefID = "";
    teacherSnapshot.forEach((doc) => {
      let teacher = doc.data();

      setTeacherDocID(teacher.id);
      setName(teacher.first_name + " " + teacher.last_name);
      setRole("Teacher");
      setIsPretestEnabled(teacher.isPretestEnabled);
      setIsPosttestEnabled(teacher.isPosttestEnabled);

      schoolRefID = teacher.school_id;
    });

    getSchoolData(schoolRefID);
  };

  const getSectionsData = async () => {
    const sectionsRef = collection(db, "section");

    // Get sections handled by teacher by grade level
    const sectionsQuery = query(
      sectionsRef,
      where("teacher_id", "==", sessionStorage.getItem("teacher_id")),
      orderBy("grade_level")
    );
    const sectionsSnap = await getDocs(sectionsQuery);

    if (sectionsSnap) {
      let sectionsTemp = sectionsSnap.docs;

      let sectionsPromises = sectionsTemp.map(async (s) => {
        return {
          ...s.data(),
          tookPretest: await totalTookPretest(s.data().id),
          tookPosttest: await totalTookPosttest(s.data().id),
        };
      });

      sectionsPromises.forEach((sec, index) => {
        sec.then((s) => {
          setSections((existingSections) => [
            ...existingSections.slice(0, index),
            (existingSections[index] = s),
            ...existingSections.slice(index + 1),
          ]);
        });
      });
    } else {
      console.log("No section document found.");
    }
  };

  const totalTookPretest = async (sectionID) => {
    console.log("sectionID: ", sectionID);
    const pretestRef = collection(db, "pre-test");
    const pretestQuery = query(
      pretestRef,
      where("section_id", "==", sectionID),
      where("school_year", "==", sessionStorage.getItem("school_year"))
    );
    const pretestSnap = await getCountFromServer(pretestQuery);

    return pretestSnap.data().count;
  };

  const totalTookPosttest = async (sectionID) => {
    const posttestRef = collection(db, "post-test");
    const posttestQuery = query(
      posttestRef,
      where("section_id", "==", sectionID),
      where("school_year", "==", sessionStorage.getItem("school_year"))
    );
    const posttestSnap = await getCountFromServer(posttestQuery);

    return posttestSnap.data().count;
  };

  // Functions
  useEffect(() => {
    getTeacherAndSchoolData();
    getSectionsData();
  }, []);

  useEffect(() => {
    console.log("Sections data updated.");
  }, [sections]);

  const { currentUser } = useAuth();
  useEffect(() => {
    // If user is not logged in, redirect them to welcome page
    if (currentUser === null) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <div className="p-24 pt-8">
        <div className="flex py-2 flex-row justify-between mt-6 mb-10">
          <div className="w-3/4 flex flex-row gap-6">
            <div className="flex items-center overflow-hidden  text-cyan-600">
              <FontAwesomeIcon icon={faUser} size="2xl" />
            </div>

            <div className="">
              <p className="text-2xl font-bold">{name}</p>
              <p className="text-l">
                {role}, {school}, SY {schoolYear}
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
        <p className="text-2xl font-bold text-coraBlue-1">Sections</p>
        {/* Search section box */}
        {/* <SearchBox text="Search section"></SearchBox> */}
        <div className="flex-1 mt-4 px-2">
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
                {sections.map((sec, index) => {
                  console.log("Sec", sec);
                  return (
                    <tr className="border-b-2 border-black">
                      <td>{sec.grade_level}</td>
                      <td>{sec.name}</td>
                      <td>{sec.tookPretest}</td>
                      <td>{sec.tookPosttest}</td>
                      <td>{sec.total_students}</td>
                      <td className="py-4">
                        <div className="flex flex-col justify-center gap-2">
                          <button
                            onClick={() => {
                              sessionStorage.setItem("section_id", sec.id);
                              sessionStorage.setItem(
                                "sec_grade_level",
                                sec.grade_level
                              );
                              sessionStorage.setItem("sec_name", sec.name);
                              sessionStorage.setItem(
                                "total_students",
                                sec.total_students
                              );
                              sessionStorage.setItem("school", school);
                              router.push("/teacher/classDetails");
                            }}
                            className="font-bold p-2 rounded-md bg-cyan-600 text-white border-2 border-cyan-600 text-sm"
                          >
                            View Summary
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>

        {/* Search students & Passage Accessibility */}
        <div className="flex flex-row gap-12 mt-10 justify-between">
          {/* Search student box */}
          <div className="w-1/2 hidden">
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
                    {searchStudents.map((student) => {
                      return (
                        <tr className="border-b-2">
                          <td className="py-2">{student.name}</td>
                          <td>{student.grade_level}</td>
                          <td>{student.name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
          {/* Passage Accessibility */}
          {/* https://bobbyhadz.com/blog/react-get-element-by-id */}
          <div class=" w-1/3 flex flex-col gap-2">
            <p className="text-xl font-bold mr-3 text-orange-600 ">
              Passages Accessibility
            </p>
            <div className="flex justify-between pl-2 pr-10">
              <label
                class="inline-block mr-5 hover:cursor-pointer text-lg font-bold"
                for="togglePretestAccess"
              >
                Allow Pre-test
              </label>
              <input
                class="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[rgba(0,0,0,0.25)] outline-none before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-coraBlue-4 after:shadow-[0_0px_5px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-coraBlue-1 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                type="checkbox"
                role="switch"
                id="togglePretestAccess"
                onChange={() => {
                  console.log("Toggled switch");
                  setIsPretestEnabled(!isPretestEnabled);
                  // Update ispretestenabled in DB
                  const teacherRef = doc(db, "teachers", teacherDocID);
                  const data = {
                    isPretestEnabled: !isPretestEnabled,
                  };
                  updateDoc(teacherRef, data)
                    .then((docRef) => {
                      console.log(
                        "A New Document Field has been added to an existing document"
                      );
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
                checked={isPretestEnabled}
              />
            </div>
            <div className="flex justify-between pl-2 pr-10">
              <label
                class="inline-block mr-5 hover:cursor-pointer text-lg font-bold"
                for="togglePosttestAccess"
              >
                Allow Post test
              </label>
              <input
                class="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[rgba(0,0,0,0.25)] outline-none before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-coraBlue-4 after:shadow-[0_0px_5px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-coraBlue-1 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                type="checkbox"
                role="switch"
                id="togglePosttestAccess"
                checked={isPosttestEnabled}
                onChange={() => {
                  console.log("Toggled switch");
                  setIsPosttestEnabled(!isPosttestEnabled);
                  // Update ispretestenabled in DB
                  const teacherRef = doc(db, "teachers", teacherDocID);
                  const data = {
                    isPosttestEnabled: !isPosttestEnabled,
                  };
                  updateDoc(teacherRef, data)
                    .then((docRef) => {
                      console.log(
                        "A New Document Field has been added to an existing document"
                      );
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
