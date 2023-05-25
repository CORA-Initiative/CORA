import Login from "@/components/Login";
import { useAuth } from "@/context/AuthContext";
import { thisUser } from "@/context/UserContext";
import { useRouter } from "next/router";

export default function StudentLogin() {
  const { currentUser } = useAuth();
  const user = thisUser();
  const router = useRouter();

  return <>{<Login userType={"student"} />}</>;
}
