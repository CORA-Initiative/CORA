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
      </div>

      <div className="flex flex-col gap-8 md:w-1/2">
        <p className="font-bold text-xl">Add Section Details</p>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2">
            <label className="font-bold">Grade Level</label>
            <input className="border-2 border-coraBlue-1 p-2 rounded" />
          </div>

          <div className="grid grid-cols-2">
            <label className="font-bold">Section Name</label>
            <input className="border-2 border-coraBlue-1 p-2 rounded" />
          </div>

          <div className="grid grid-cols-2">
            <label className="font-bold">Total Students</label>
            <input className="border-2 border-coraBlue-1 p-2 rounded" />
          </div>

          <div className="grid grid-cols-2">
            <label className="font-bold">
              Assigned Teacher (enter Teacher ID)
            </label>
            <input className="border-2 border-coraBlue-1 p-2 rounded" />
          </div>

          <button className="p-2 px-8 rounded font-bold bg-coraBlue-1 text-white self-end">
            Create section
          </button>
        </div>
      </div>
    </div>
  );
}
