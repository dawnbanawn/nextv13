"use server";
import React from "react";
import Link from "next/link";
import { prisma } from "../db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

//Create a new card
async function createCard(data: FormData) {
  //Server code only
  "use server";
  //Gets values from form, and checks them.
  const title = data.get("title")?.valueOf();
  const text: string = data.get("text")?.valueOf() as string;
  if (typeof title === "string" && title !== "") {
    if (text !== "") {
      await prisma.card.create({ data: { title, text } });
      redirect("../adminn");
    }
  }
}

const Edit = async () => {
  revalidatePath("/edit");
  return (
    <div>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">{"props.id"}</h1>
      </header>
      <form action={createCard} className="flex gap-2 flex-col">
        <input
          type="text"
          value={"props.title"}
          name="title"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded bg-slate-700 focus-within:bg-slate-700 outline-none focus-within:border-slate-100"
        />
        <input
          type="text"
          name="text"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded bg-slate-700 focus-within:bg-slate-700 outline-none focus-within:border-slate-100"
        />

        <div className="flex gap-1 justify-end">
          <Link
            href="../adminn"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
          <button
            id={"props.id"}
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Edit;
