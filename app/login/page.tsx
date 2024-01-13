"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import globalVariable from "../GlobalVariable";
import getUser from "../GetUser";

//Login page
function Login() {
  let [failedAttempt, setFailedAttempt] = useState("");
  const [isLoggin, setIsLoggedIn] = useState(false);
  const router = useRouter();
  //Function to log out.
  function logout() {
    globalVariable("false");
    localStorage?.setItem("loggedIn", "false");
    setIsLoggedIn(false);
    router.refresh();
  }
  //Function to log in.
  //Fetches from database, and compares with login input values.
  async function tryLogin(event: any) {
    event.preventDefault();
    //Fetches user data from db.
    const cards = await getUser();
    //Compares form data with db values.
    if (
      cards.name === event.target.userName.value &&
      cards.password === event.target.password.value
    ) {
      //Sets global variable with true that the user is logged in.
      globalVariable("true");
      localStorage.setItem("loggedIn", "true");
      setIsLoggedIn(true);
      setFailedAttempt("false");
      router.refresh();
    } else {
      //console.log("fail");
      setFailedAttempt("true");
    }
  }

  useEffect(() => {
    // Perform localStorage action
    const item = localStorage.getItem("loggedIn");

    if (item) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="bg-blue-100">
      {isLoggin ? (
        <div className="w-full max-w-xs mx-auto flex justify-center align-center">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
            <p>You are logged in.</p>
            <p>Would you like to log out?</p>
            <br />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={logout}
            >
              Yes
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-xs mx-auto">
          <br />
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={tryLogin}
            action=""
          >
            <input
              className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="userName"
              type="text"
              placeholder="username"
            />
            <input
              className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              type="text"
              placeholder="password"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              type="submit"
            >
              Submit
            </button>
          </form>
          {failedAttempt === "true" ? (
            <p>Login failed. Please try again.</p>
          ) : (
            <p></p>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
