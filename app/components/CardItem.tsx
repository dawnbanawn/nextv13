"use client";
import { useState } from "react";

type CardItemProps = {
  id: string;
  title: string;
  text: string;
  mainPage: boolean;
  createdAt: Date;
  deleteThisCard: (id: string) => void;
  edit: (data: FormData) => void;
};

export function CardItem({
  id,
  title,
  text,
  mainPage,
  createdAt,
  edit,
  deleteThisCard,
}: CardItemProps) {
  const d = new Date(createdAt);
  //Stores if user is logged in.
  const [data, setData] = useState("");
  const [date, setDate] = useState("");
  const [editCard, setEditCard] = useState(false);

  if (typeof window !== "undefined") {
    setTimeout(function () {
      setData(localStorage.getItem("loggedIn")), setDate(d.toLocaleString());
    }, 100);
  }
  return (
    <div className="bg-yellow-100 mx-auto w-3/5 shadow-md rounded px-8 pt-6 pb-8 mb-6">
      {mainPage ? (
        <li className="gap-1 items-center">
          <div className=" pl-2 pr-2">
            <p>Updated: {date}</p>
            <p className="pt-3">Title: {title}</p>

            <p className="pt-3 pb-5">Text: {text}</p>
          </div>
          <br />
        </li>
      ) : (
        <div>
          {data === "true" ? (
            <div>
              <li className="gap-1 items-center">
                <button
                  className="bg-white hover:bg-gray-100 text-gray-800  px-1  border border-gray-400 rounded shadow"
                  onClick={(e) => deleteThisCard(id)}
                >
                  Delete
                </button>
                <button
                  className="bg-white ml-1 hover:bg-gray-100 text-gray-800  px-1  border border-gray-400 rounded shadow"
                  id="edit"
                  onClick={(e) => setEditCard(!editCard)}
                >
                  Edit
                </button>
                <br className="mb-3" />
                <p className="mb-3">Updated: {date}</p>
              </li>
              {editCard ? (
                <div className="pt-2">
                  <form action={edit}>
                    <input
                      className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      defaultValue={title}
                      name="editTitle"
                      placeholder={title}
                    />
                    <br />
                    <input
                      className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      defaultValue={text}
                      name="editText"
                      placeholder={text}
                    />
                    <br />
                    <div className="pt-2">
                      <button
                        className="bg-white  hover:bg-gray-100 text-gray-800  px-1  border border-gray-400 rounded shadow"
                        name={id}
                        type="submit"
                        onClick={(e) => deleteThisCard(id)}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                  <p>Title: {title}</p>
                  <p>Text: {text}</p>
                  <br />
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}
