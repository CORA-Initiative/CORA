import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { thisUser } from "@/context/UserContext";
import { useRouter } from "next/router";

export default function Login({ userType }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const router = useRouter();
  const { setUserID, setTeacherID, setStudentID, setUserType } = thisUser();

  const { login, signup, currentUser } = useAuth();
  console.log(currentUser);

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
          sessionStorage.setItem("teacher_id", email);
          router.push("/teacher/dashboard");
        } else {
          sessionStorage.setItem("user_type", "student");
          sessionStorage.setItem("student_id", email);
          router.push("/student/dashboard");
        }
      } catch (err) {
        setError("Incorrect email or password.");
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
        const docRef = await addDoc(collection(db, "teachers"), {
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

  return (
    <div>
      <div className="p-16">
        <div className="w-full text-6xl text-center tracking-widest">CORA</div>
        <div className="text-xl text-center mt-3">
          Computerized Oral Reading Assessment
        </div>
      </div>
      {error && <div>{error}</div>}
      <div className="flex items-center justify-center">
        <div className="flex flex-col w-96 p-4">
          <div>
            Enter your information to {isLoggingIn ? "login" : "register"}.
          </div>
          {!isLoggingIn && (
            <input
              className="w-full px-4 py-2 mt-6 border border-gray-400 rounded focus:outline-none focus:ring-1 npfocus:ring-blue-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Full Name"
            />
          )}
          <input
            className="w-full px-4 py-2 mt-6 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder={"Enter Email"}
          />
          <input
            className="w-full px-4 py-2 mt-8 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
          />
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
