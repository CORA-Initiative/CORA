import Link from "next/link";
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import { useAuth } from "@/context/AuthContext";

export default function TeacherLogin() {
  const { currentUser } = useAuth();
  console.log(currentUser);

  return (
    <>
      {!currentUser && <Login userCred={"Teacher ID"} />}
      {currentUser && <Dashboard />}
    </>
  );
}
