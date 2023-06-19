import React, { useState, useEffect, useRef } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import BackButton from "@/components/BackButton";
import { useAuth } from "@/context/AuthContext";
import { db } from "../../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useRouter } from "next/router";
import * as CryptoJS from "crypto-js";
import exportFromJSON from "export-from-json";
import { useDownloadExcel } from "react-export-table-to-excel";

export default function classDetails() {
  const router = useRouter();

  const [gradeLevel, setGradeLevel] = useState(0);
  const [sectionName, setSectionName] = useState("");
  const [teacherID, setTeacherID] = useState();

  const [totalStudents, setTotalStudents] = useState(0);
  const [sectionStudents, setSectionStudents] = useState([]);

  const [schoolName, setSchoolName] = useState("");
  const [region, setRegion] = useState("");

  const tableRef = useRef(null);

  const fileName =
    "Grade" +
    sessionStorage.getItem("grade_level") +
    "_" +
    sessionStorage.getItem("sec_name") +
    "_LoginDetails";

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: fileName,
    sheet: "students",
  });

  const exportToExcel = () => {
    console.log("Exporting data...");
    // Grade#_SecName_
    const exportType = "xls";

    console.log("Ey", sectionStudents);

    const fileName =
      "Grade" +
      sessionStorage.getItem("grade_level") +
      "_" +
      sessionStorage.getItem("sec_name") +
      "_LoginDetails";
    exportFromJSON(sectionStudents, fileName, exportType);
  };
  const getSectionStudents = async () => {
    console.log(sessionStorage.getItem("section_id"));
    const studentsRef = collection(db, "students");
    const studentsQuery = query(
      studentsRef,
      where("section_id", "==", sessionStorage.getItem("section_id")),
      orderBy("last_name")
    );

    const studentsSnap = await getDocs(studentsQuery);

    if (studentsSnap) {
      console.log(studentsSnap.docs);
      let students = studentsSnap.docs.map((s, idx) => {
        return {
          ...s.data(),
          password: decryptText(
            s.data().password,
            process.env.NEXT_PUBLIC_CRYPTO_SECRET_PASS
          ),
        };
      });
      setSectionStudents(students);
    }
  };

  const decryptText = (text, pass) => {
    console.log("To decrypt", text, pass);

    const bytes = CryptoJS.AES.decrypt(text, pass);
    const plainText = bytes.toString(CryptoJS.enc.Utf8).replaceAll('"', "");
    console.log(typeof plainText);
    return plainText;
  };

  // Call when rendered
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser === null) {
      router.push("/");
      return;
    }
    setGradeLevel(sessionStorage.getItem("sec_grade_level"));
    setSectionName(sessionStorage.getItem("sec_name"));
    setRegion(sessionStorage.getItem("school_region"));
    setSchoolName(sessionStorage.getItem("school_name"));
    setTotalStudents(sessionStorage.getItem("total_students"));

    getSectionStudents();
  }, []);

  return (
    <div className="p-8 md:p-24 md:pt-8">
      {/* Back button */}
      <div className="flex justify-between">
        <BackButton />
        <div className="flex justify-between gap-4">
          <button
            className="p-2 px-8 rounded font-bold bg-gray-500 text-white self-end"
            onClick={() => {
              sessionStorage.setItem("sec_name", sectionName);
              sessionStorage.setItem("grade_level", gradeLevel);
              router.push("/admin/editSection");
            }}
          >
            Edit section
          </button>
          <button
            className="p-2 px-8 rounded font-bold bg-coraBlue-1 text-white self-end"
            onClick={() => {
              sessionStorage.setItem("sec_name", sectionName);
              sessionStorage.setItem("grade_level", gradeLevel);
              router.push("/admin/addStudent");
            }}
          >
            Add student
          </button>
        </div>
      </div>

      <div className="flex justify-center my-10">
        <p className="font-bold text-3xl">
          Grade {gradeLevel} - {sectionName}
        </p>
      </div>

      {/* ------------------List of Students */}
      <div className="flex flex-col justify-between mt-12">
        <div className="flex flex-1 ">
          <table
            ref={tableRef}
            class="mt-4 mx-0 table-fixed w-full text-md text-left"
          >
            <thead>
              <tr className="border-b-4 border-black">
                <th className="w-10">#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>ID</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sectionStudents.map((student, idx) => {
                return (
                  <tr>
                    <td>{idx + 1}</td>
                    <td className="break-words">
                      {student.last_name +
                        ", " +
                        student.first_name +
                        " " +
                        student.middle_name}
                    </td>
                    <td className="break-words">{student.email}</td>
                    <td className="break-words">{student.password}</td>
                    <td className="break-words">{student.id}</td>

                    <td className="text-center">
                      <button
                        className="underline"
                        onClick={() => {
                          sessionStorage.setItem("student_ref_id", student.id);
                          router.push("/admin/studentProfile");
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          className="my-12 p-2 px-8 rounded font-bold bg-black text-white w-fit fixed-bottom"
          onClick={onDownload}
        >
          Export as sheets (.xls)
        </button>
      </div>
    </div>
  );
}
