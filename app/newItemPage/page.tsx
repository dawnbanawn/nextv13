import React from "react";
import Link from "next/link";
import { prisma } from "../db";
import { redirect } from "next/navigation";

//Creates a new card with data from form.
async function createCard(data: FormData) {
  //Server code only
  "use server";
  const title = data.get("title")?.valueOf();
  const text: string = data.get("text")?.valueOf() as string;
  if (typeof title === "string" && title !== "") {
    if (text !== "") {
      await prisma.card.create({ data: { title, text } });
      redirect("../adminn");
    }
  }
}

export default function Page() {
  return (
    <div>
      <header className="flex justify-between items-center mb-4">
        <h1 className="mx-auto text-2xl">New Post-it</h1>
      </header>
      <form
        action={createCard}
        className="bg-yellow-100 shadow-md rounded px-8 pt-6 pb-8 mb-4  w-3/5 mx-auto"
      >
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label htmlFor="text">Text</label>
        <input
          id="text"
          type="text"
          name="text"
          className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <div className="flex gap-1 justify-end">
          <Link
            href="../adminn"
            className="bg-white  hover:bg-gray-100 text-gray-800  px-1  border border-gray-400 rounded shadow"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-white  hover:bg-gray-100 text-gray-800  px-1  border border-gray-400 rounded shadow"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
