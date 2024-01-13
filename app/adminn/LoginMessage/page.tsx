"use client";
import React from "react";
import { useState } from "react";

//Shows a text if the user tries to reach admin page not logged in.
const PleaseLogin = () => {
  const [data, setData] = useState("true")

  if (typeof window !== 'undefined') {
    setTimeout(function(){ setData(localStorage.getItem("loggedIn")) }, 100);
  }
  return (
    <div>
      {data !== "true" ? (
        <div>Please login!</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PleaseLogin;
