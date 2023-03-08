import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { logout, currentUser } = useAuth();
  console.log(currentUser);

  return (
    <>
      <div>Dashboard</div>
      <div>Delete this if there's already a dashboard</div>
      <button onClick={logout}>Logout</button>
    </>
  );
}
