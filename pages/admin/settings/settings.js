import BackButton from "@/components/BackButton";
import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function settings() {
  const { logout, currentUser } = useAuth();

  const logoutAdmin = () => {
    logout();
    router.push("/");
  };
  return (
    <div className="flex flex-col p-14 py-8 gap-8">
      <div className="flex flex-row justify-between">
        <BackButton></BackButton>
        <button
          className="p-1 px-8 rounded font-bold bg-coraBlue-1 text-white self-end"
          onClick={logoutAdmin}
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col gap-8 md:w-1/2">
        <p className="font-bold text-xl">School Details</p>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2">
            <label className="font-bold">School Name</label>
            <input
              className="border-2 border-coraBlue-1 p-2 rounded"
              value={sessionStorage.getItem("school_name")}
            />
          </div>

          <div className="grid grid-cols-2">
            <label className="font-bold">School Region</label>
            <input
              className="border-2 border-coraBlue-1 p-2 rounded"
              value={sessionStorage.getItem("school_region")}
            />
          </div>

          <div className="grid grid-cols-2">
            <label className="font-bold">School Year</label>
            <input
              className="border-2 border-coraBlue-1 p-2 rounded"
              value={sessionStorage.getItem("school_year")}
            />
          </div>

          <button className="p-2 px-8 rounded font-bold bg-coraBlue-1 text-white self-end">
            Update Data
          </button>
        </div>
      </div>
    </div>
  );
}
