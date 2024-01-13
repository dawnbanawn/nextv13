"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";

//Different styling to buttons, depending on which one is active.
const stylesButtonInactive =
  "text-zinc-500 hover:text-zinc-800 transition-colors";
const stylesButtonActive = "text-black-1000 transition-colors";

const NavBar = () => {
  const [data, setData] = useState("");

  //Keeps track of what page is currently active.
  const [whatPage, setWhatPage] = useState("/");

  //Function to save what page is active.
  async function pageCheck(props: any) {
    //console.log(props.target.id)
    setWhatPage(props.target.id);
  }
  //The first refresh-cycle doesnt include localstorage.
  //This function waits for the window to load before loading local storage.
  if (typeof window !== "undefined") {
    setTimeout(function () {
      setData(localStorage.getItem("loggedIn"));
    }, 100);
  }

  return (
    <nav className="bg-yellow-100 shadow flex space-x-6  mb-5  h-14 items-center justify-between">
      <Link className="pl-5" href="/">
        <h1>Post-it</h1>
      </Link>
      <div className="flex ml-4 pr-5">
        <ul className="flex space-x-6">
          <li>
            <Link
              onClick={pageCheck}
              id="01"
              className={
                whatPage === "01" ? stylesButtonActive : stylesButtonInactive
              }
              href="/"
            >
              Home
            </Link>
          </li>
          <div className="sm:flex">
            {data === "true" ? (
              <li>
                <Link
                  onClick={pageCheck}
                  id="03"
                  className={
                    whatPage === "03"
                      ? stylesButtonActive
                      : stylesButtonInactive
                  }
                  href="/adminn"
                >
                  Admin
                </Link>
              </li>
            ) : (
              <></>
            )}
          </div>

          <li>
            <Link
              onClick={pageCheck}
              id="02"
              className={
                whatPage === "02" ? stylesButtonActive : stylesButtonInactive
              }
              href="/login"
            >
              {data === "true" ? "Logout" : "Login"}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
