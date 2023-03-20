import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Login({ userCred }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const { login, signup, currentUser } = useAuth();
  console.log(currentUser);

  // will toggle the type of entry (i.e., login or register)
  const toggleEntry = () => setIsLoggingIn(!isLoggingIn);

  async function submitHandler() {
    if (!email || !password) {
      setError("Please enter valid credentials.");
      return;
    }
    if (isLoggingIn) {
      try {
        await login(email, password);
      } catch (err) {
        setError("Incorrect email or password.");
      }
      return;
    }
    await signup(email, password);
  }

  return (
    <div>
      <div className="p-16">
        <div className="w-full text-6xl text-center tracking-widest">CORA</div>
        <div className="text-xl text-center mt-3">
          Computerized Oral Reading Assessment
        </div>
      </div>
      {error && <div>{error}</div>}
      <div className="flex items-center justify-center">
        <div className="flex flex-col w-96 p-4">
          <div>
            Enter your information to {isLoggingIn ? "login" : "register"}.
          </div>
          {!isLoggingIn && (
            <input
              className="w-full px-4 py-2 mt-6 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Full Name"
            />
          )}
          <input
            className="w-full px-4 py-2 mt-6 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder={userCred}
          />
          <input
            className="w-full px-4 py-2 mt-8 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <div className="flex flex-col items-center justify-center">
            <button
              className="px-10 py-1 mt-20 text-white font-bold text-lg bg-blue-600 rounded hover:bg-blue-900"
              onClick={submitHandler}
            >
              {isLoggingIn ? "Login" : "Register"}
            </button>
            <div
              className="text-xs text-center mt-4 w-40 cursor-pointer"
              onClick={toggleEntry}
            >
              {isLoggingIn
                ? "Don't have an account yet? Sign up here."
                : "Already have an account? Log in here."}
            </div>
            <div></div>
            <h3>
              <Link href="/">Home</Link>
            </h3>
          </div>
        </div>
      </div>
    </div>
    // <div className="flex-1 text-xs sm:text-sm flex flex-col justify-center items-center gap-2 sm:gap-4">
    //   <h1 className="font-extrabold select-none text-2xl sm:text-4xl uppercase">
    //     {isLoggingIn ? "Login" : "register"}
    //   </h1>
    //   {error && (
    //     <div className="w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2">
    //       {error}
    //     </div>
    //   )}
    //   <input
    //     type="text"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     placeholder="Email Address"
    //     className="outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
    //   />
    //   <input
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     type="password"
    //     placeholder="Password"
    //     className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300"
    //   />
    //   <button
    //     onClick={submitHandler}
    //     className="w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900"
    //   >
    //     <h2 className="relative z-20">SUBMIT</h2>
    //   </button>
    //   <h2
    //     className="duration-300 hover:scale-110 cursor-pointer"
    //     onClick={() => setIsLoggingIn(!isLoggingIn)}
    //   >
    //     {!isLoggingIn ? "Login" : "Register"}
    //   </h2>
    // </div>
  );
}
