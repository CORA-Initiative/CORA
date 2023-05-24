import Head from "next/head";
import { Inter } from "@next/font/google";
import { useAuth } from "../context/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext, thisUser } from "../context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { currentUser } = useAuth();
  console.log("currentUser: ", currentUser);

  return (
    <>
      <Head>
        <title>CORA</title>
        <meta
          name="description"
          content="Computerized Oral Reading Assessment"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center h-screen">
        <div>
          <div className="w-full text-9xl text-center tracking-widest">
            CORA
          </div>
          <div className="text-4xl text-center mt-3">
            Computerized Oral Reading Assessment
          </div>
        </div>
        <div className="mt-20 flex flex-col">
          <div className="text-4xl text-center">Login as</div>
          <div className="mt-14 flex items-center justify-center gap-4">
            <a className="" href="./student/studentLogin">
              <button className="px-10 py-1 text-white font-bold text-lg bg-blue-600 rounded hover:bg-blue-900">
                Student
              </button>
            </a>
            <a className="" href="./teacher/teacherLogin">
              <button className="px-10 py-1 text-black font-bold text-lg bg-white border border-black rounded hover:bg-gray-200">
                Teacher
              </button>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
