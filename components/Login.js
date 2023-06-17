import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function Login({ userType }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const { login, signup, currentUser, logout } = useAuth();

  // will toggle the type of entry (i.e., login or register)
  const toggleEntry = () => setIsLoggingIn(!isLoggingIn);

  async function submitHandler() {
    if (!email || !password) {
      setError("Please enter valid credentials.");
      return;
    }
    if (isLoggingIn) {
      try {
        const res = await login(email, password);

        if (userType == "teacher") {
          sessionStorage.setItem("user_type", "teacher");

          const teachersRef = collection(db, "teachers");
          const teachersQuery = query(teachersRef, where("email", "==", email));
          const querySnapshot = await getDocs(teachersQuery);

          let teacher = null;
          querySnapshot.forEach((doc) => {
            teacher = doc.data();
            sessionStorage.setItem("teacher_id", teacher.id);
          });

          // If user not in teacher database
          if (teacher === null) {
            logout();
            toast.error("You cannot login as teacher.");
          }

          router.push("/teacher/dashboard");
        } else if (userType == "admin") {
          sessionStorage.setItem("user_type", "admin");

          const adminRef = collection(db, "admin");
          const adminQuery = query(adminRef, where("email", "==", email));
          const querySnapshot = await getDocs(adminQuery);

          let admin = null;
          querySnapshot.forEach((doc) => {
            admin = doc.data();
            sessionStorage.setItem("admin_id", admin.id);
          });

          // If user not in teacher database
          if (admin === null) {
            logout();
            toast.error("You cannot login as admin.");
          }

          router.push("/admin/dashboard");
        } else {
          // User type: student
          sessionStorage.setItem("user_type", "student");
          // Search DB for student ref document
          const studentsRef = collection(db, "students");
          const studentsQuery = query(studentsRef, where("email", "==", email));
          const querySnapshot = await getDocs(studentsQuery);

          let student = null;
          querySnapshot.forEach((doc) => {
            student = doc.data();
            sessionStorage.setItem("student_ref_id", student.id);
          });

          // If the use is not in student DB, reject access
          if (student === null) {
            logout();
            toast.error("You cannot login as student.");
          }
          router.push("/student/dashboard");
        }
      } catch (err) {
        setError("Incorrect email or password. Try again.");
      }

      return;
    }
    // Will signup the user and store the user in credentials variable
    const credentials = await signup(email, password);

    // Based on the userCred (teacher or student), the new user will be
    // added to its corresponding collection (teachers or students) in
    // the database (Firestore)
    if (userType == "teacher") {
      try {
        const docRef = await addDoc(collection(db, "admin"), {
          email: credentials.user.email,
          // enter other info here except password; passwords can't be retrieved
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      try {
        const docRef = await addDoc(collection(db, "students"), {
          email: credentials.user.email,
          // enter other info here except password; passwords can't be retrieved
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    // TODO 1: Make the document id same as the user id (auth)
    // TODO 2: When doing TODO 1, also find a way to not do these collection
    // operations on the client side tip: Use Firebase Authentication triggers
  }

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
      <div className="p-16">
        <div className="w-full text-6xl text-center tracking-widest">CORA</div>
        <div className="text-xl text-center mt-3">
          Computerized Oral Reading Assessment
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex flex-col w-96 p-4">
          <div>
            Enter your information to {isLoggingIn ? "login" : "register"}.
          </div>
          {!isLoggingIn && (
            <div className="w-full mt-6 border rounded border-gray-400">
              <input
                className="w-full px-4 py-2  rounded focus:outline-none focus:ring-1 npfocus:ring-blue-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Full Name"
              />
            </div>
          )}
          <div className="w-full mt-6 border rounded border-gray-400">
            <input
              className="w-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder={"Enter Email"}
            />
          </div>

          <div className="grid grid-cols-5 mt-6 border border-gray-400 rounded">
            <input
              className="col-span-4 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter Password"
            />
            <button className="w-full " onClick={togglePasswordVisibility}>
              {!isPasswordVisible && (
                <FontAwesomeIcon
                  title="Show password"
                  icon={faEye}
                  color="grey"
                />
              )}
              {isPasswordVisible && (
                <FontAwesomeIcon
                  title="Hide password"
                  icon={faEyeSlash}
                  color="grey"
                />
              )}
            </button>
          </div>

          {error && (
            <div className="bg-red-300 my-4 rounded-md text-center text-sm">
              {error}
            </div>
          )}
          <div className="flex flex-col items-center justify-center gap-16">
            <button
              className="px-10 py-1 mt-20 text-white font-bold text-lg bg-blue-600 rounded hover:bg-blue-900"
              onClick={submitHandler}
            >
              {isLoggingIn ? "Login" : "Register"}
            </button>
            {/* <div
              className="text-xs text-center mt-4 w-40 cursor-pointer"
              onClick={toggleEntry}
            >
              {isLoggingIn
                ? "Don't have an account yet? Sign up here."
                : "Already have an account? Log in here."}
            </div> */}

            <h3 className="">
              <Link href="/">Home</Link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
