import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
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
} from "firebase/firestore";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export default function dashboard() {
  const router = useRouter();

  // Teacher details
  const [name, setName] = useState();
  const [role, setRole] = useState("Admin");
  const [adminID, setAdminID] = useState();

  // Section data
  const [sections, setSections] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // DATA RETRIEVERS
  const getSchoolData = async (schoolRefID) => {
    const schoolRef = doc(db, "school", schoolRefID);
    try {
      const schoolSnap = await getDoc(schoolRef);

      if (schoolSnap.exists()) {
        let school = schoolSnap.data();
        sessionStorage.setItem("school_region", school.region);
        sessionStorage.setItem("school_name", school.name);
        sessionStorage.setItem("school_year", school.school_year);
      } else {
        console.log("No school found.");
      }
    } catch (e) {
      console.log("Error getting school document.");
    }
  };

  const getAdminAndSchoolData = async () => {
    const adminsRef = collection(db, "admin");
    const adminsQuery = query(
      adminsRef,
      where("id", "==", sessionStorage.getItem("admin_id"))
    );
    const adminSnap = await getDocs(adminsQuery);

    adminSnap.forEach((doc) => {
      let admin = doc.data();
      setName(admin.first_name + " " + admin.last_name);
      setAdminID(admin.id);

      sessionStorage.setItem("school_ref_id", admin.school_id);
    });

    getSchoolData(sessionStorage.getItem("school_ref_id"));
  };

  const getSectionsData = async () => {
    const sectionsRef = collection(db, "section");
    // Get sections handled by teacher by grade level
    const sectionsQuery = query(
      sectionsRef,
      where("school_id", "==", sessionStorage.getItem("school_ref_id")),
      orderBy("grade_level")
    );
    const sectionsSnap = await getDocs(sectionsQuery);

    if (sectionsSnap) {
      console.log(sectionsSnap.docs);
      sectionsSnap.docs.forEach((sec, index) => {
        setSections((existingSections) => [
          ...existingSections.slice(0, index),
          sec.data(),
          ...existingSections.slice(index + 1),
        ]);
      });
    } else {
      console.log("No section document found.");
    }
  };

  const getTeachersData = async () => {
    const teachersRef = collection(db, "teachers");
    // Get sections handled by teacher by grade level
    const teachersQuery = query(
      teachersRef,
      where("school_id", "==", sessionStorage.getItem("school_ref_id"))
    );
    const teachersSnap = await getDocs(teachersQuery);

    if (teachersSnap) {
      teachersSnap.docs.forEach((t, index) => {
        setTeachers((existingTeachers) => [
          ...existingTeachers.slice(0, index),
          t.data(),
          ...existingTeachers.slice(index + 1),
        ]);
      });
    } else {
      console.log("No teacher document found.");
    }
  };
  // ON MOUNT
  useEffect(() => {
    if (sections.length === 0) {
      getAdminAndSchoolData();
      getSectionsData();
      getTeachersData();
    }
  }, []);

  const { currentUser } = useAuth();
  useEffect(() => {
    // If user is not logged in, redirect them to welcome page
    if (currentUser === null) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <div className="p-8 md:p-24 md:pt-8">
        <div className="flex py-2 flex-row justify-between mt-6 mb-10">
          <div className="w-3/4 flex flex-row gap-6">
            <div className="flex items-center overflow-hidden  text-cyan-600">
              <FontAwesomeIcon icon={faUser} size="2xl" />
            </div>

            <div className="">
              <p className="text-2xl font-bold">{name}</p>
              <p className="text-l">
                {role}, {sessionStorage.getItem("school_name")}, SY{" "}
                {sessionStorage.getItem("school_year")}
              </p>
            </div>
          </div>

          <button
            className="flex align-start"
            onClick={() => {
              router.push("/admin/settings/settings");
            }}
          >
            <FontAwesomeIcon icon={faGear} size="xl" />
          </button>
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
                <th>Grade Level</th>
                <th>Name</th>
                <th>ID</th>

                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((sec, index) => {
                console.log("Sec", sec);
                return (
                  <tr className="border-b-2 border-black">
                    <td>{sec.grade_level}</td>
                    <td>{sec.name}</td>
                    <td>{sec.id}</td>
                    <td>{sec.total_students}</td>
                    <td className="py-4">
                      <div className="flex flex-row justify-center gap-2">
                        <button
                          onClick={() => {
                            sessionStorage.setItem("section_id", sec.id);
                            sessionStorage.setItem(
                              "sec_grade_level",
                              sec.grade_level
                            );
                            sessionStorage.setItem("sec_name", sec.name);
                            sessionStorage.setItem(
                              "assigned_teacher",
                              sec.teacher_id
                            );
                            sessionStorage.setItem(
                              "total_students",
                              sec.total_students
                            );
                            router.push("/admin/classList");
                          }}
                          className="font-bold p-2 rounded-md bg-red-600 text-white text-sm"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => {
                            sessionStorage.setItem("section_id", sec.id);
                            sessionStorage.setItem(
                              "sec_grade_level",
                              sec.grade_level
                            );
                            sessionStorage.setItem("sec_name", sec.name);
                            sessionStorage.setItem(
                              "assigned_teacher",
                              sec.teacher_id
                            );
                            sessionStorage.setItem(
                              "total_students",
                              sec.total_students
                            );
                            router.push("/admin/classList");
                          }}
                          className="font-bold p-2 px-6 rounded-md bg-cyan-700 text-white text-sm"
                        >
                          View class list
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            className="mt-4 p-1 px-4 rounded font-bold bg-coraBlue-4 text-white self-end"
            onClick={() => {
              router.push("/admin/addSection");
            }}
          >
            Add section
          </button>
        </div>

        <div className="mt-16 flex flex-row justify-between">
          {" "}
          <p className="text-2xl font-bold text-coraBlue-1">Teachers</p>
        </div>

        <div className="flex-1 mt-4 px-2">
          {/* Table header */}
          <table className="table-auto md:table-fixed w-full text-md text-left">
            <thead>
              <tr className="border-b-4 border-black text-lg">
                <th>Name</th>
                <th>Email</th>
                <th>ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t, index) => {
                return (
                  <tr className="border-b-2 border-black">
                    <td>
                      {t.last_name + ", " + t.first_name + " " + t.middle_name}
                    </td>
                    <td>{t.email}</td>
                    <td>{t.id}</td>
                    <td className="py-4">
                      <div className="flex flex-row justify-center gap-2">
                        <button
                          onClick={() => {
                            console.log("Cannot delete.");
                          }}
                          className="font-bold p-2 rounded-md bg-red-600 text-white text-sm"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => {
                            sessionStorage.setItem("teacher_ref_id", t.id);

                            router.push("/admin/teacherProfile");
                          }}
                          className="font-bold p-2 px-8 rounded-md bg-cyan-700 text-white text-sm"
                        >
                          View Profile
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            className="mt-4 p-1 px-4 rounded font-bold bg-coraBlue-4 text-white self-end"
            onClick={() => {
              router.push("/admin/addTeacher");
            }}
          >
            Add teacher
          </button>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
