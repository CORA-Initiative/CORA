import Login from "@/components/Login";
import { useAuth } from "@/context/AuthContext";

export default function TeacherLogin() {
  const { currentUser } = useAuth();
  console.log(currentUser);

  return <Login userType={"teacher"} />;
}
