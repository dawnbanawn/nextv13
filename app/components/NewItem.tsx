"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";

//New item button is exported if user is logged in.
const NewItem = () => {
  const [data, setData] = useState("");
  if (typeof window !== "undefined") {
    setTimeout(function () {
      setData(localStorage.getItem("loggedIn"));
    }, 100);
  }

  return (
    <div>
      {data === "true" ? (
        <Link
          className="bg-white ml-3 hover:bg-gray-100 text-gray-800  px-2  py-2 border border-gray-400 rounded shadow"
          href="../newItemPage"
        >
          New
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NewItem;
