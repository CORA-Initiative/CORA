import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useAuth } from "../context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const { currentUser } = useAuth();
  // console.log(currentUser);

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

      <main>
        <div>
          <h1>CORA</h1>
          <h3>Computerized Oral Reading Assessment</h3>
          <h4>Login as</h4>
          <a href="./student/studentLogin">
            <button>Student</button>
          </a>
        </div>
      </main>
    </>
  );
}
