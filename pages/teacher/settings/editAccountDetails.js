import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import BackButton from "@/components/BackButton";

export default function EditAccountDetails() {
  const title = "Settings";
  const subtitle = "Account Details";
  const nameHolder = "Jose Andres M. Luna";
  const emailHolder = "jal@school.com.ph";
  const teacherIDHolder = "ABC012345";
  const passwordHolder = "*******";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const [isEditAccDetails, setIsEditAccDetails] = useState(true);

  async function submitHandler() {
    if (!email || !password) {
      setError("Please enter valid credentials.");
      return;
    }
    if (isEditAccDetails) {
      try {
        //await login(email, password);
      } catch (err) {
        setError("Incorrect email or password.");
      }
      return;
    }
    //await signup(email, password);
  }

  return (
    <div className="p-12 md:px-24 pt-8">
      <BackButton />

      {/* Title */}
      <div className="flex flex-col py-2 mt-8 mb-4">
        <div className="">
          <p className="text-2xl font-normal">{title}</p>
        </div>
        {/* Logout Button */}
        <div className="mt-16">
          <p className="text-2xl font-extrabold">{subtitle}</p>
        </div>
      </div>

      <div className="flex sm:flex-row flex-col sm:gap-24 gap-16">
        {/* Account Details */}
        <div className="flex items-center justify-start">
          <div className="flex flex-col w-96 p-0">
            <div>
              Enter your new information to update your account details.
            </div>

            <label className="mt-6 opacity-60">Full Name</label>
            <input
              className="w-full px-4 py-2 mt-0 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-coraBlue-1"
              defaultValue={nameHolder}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />

            <label className="mt-4 opacity-60">Email</label>
            <input
              className="w-full px-4 py-2 mt-0 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-coraBlue-1"
              defaultValue={emailHolder}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              //placeholder={userCred}
            />

            <label className="mt-4 opacity-60">Teacher ID</label>
            <input
              className="opacity-70 w-full px-4 py-2 mt-0 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-coraBlue-1"
              value={teacherIDHolder}
              type="text"
              readonly
              //placeholder={userCred}
            />

            <label className="mt-4 opacity-60">Password</label>
            <input
              className="w-full px-4 py-2 mt-0 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-coraBlue-1"
              value={passwordHolder}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              // placeholder="Password"
            />
          </div>
        </div>

        {/* Change password */}
        <div className="mt-1">
          <p className="font-bold text-lg">Change Password</p>

          <div className="sm:mt-10 mt-6 flex flex-col w-96 p-0">
            <label className="opacity-60">Current Password</label>
            <input
              className="w-full px-4 py-2 mt-0 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-coraBlue-1"
              //value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder=""
            />

            <label className="mt-4 opacity-60">New Password</label>
            <input
              className="w-full px-4 py-2 mt-0 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-coraBlue-1"
              //value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              // placeholder="Password"
            />

            <label className="mt-4 opacity-60">Retype New Password</label>
            <input
              className="w-full px-4 py-2 mt-0 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-coraBlue-1"
              //value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              // placeholder="Password"
            />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <button
          className="px-10 py-1 text-white font-bold text-lg bg-coraBlue-1 rounded hover:bg-coraBlue-4"
          type="Submit"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}