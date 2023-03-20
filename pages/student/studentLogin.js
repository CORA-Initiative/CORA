import Link from "next/link";
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import { useAuth } from "@/context/AuthContext";

export default function StudentLogin() {
  const { currentUser } = useAuth();
  console.log(currentUser);

  return (
    <>
      {!currentUser && <Login userCred={"Student ID"} />}
      {currentUser && <Dashboard />}
    </>
  );
}
