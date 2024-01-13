import { prisma } from "../db";
import { CardItem } from "../components/CardItem";
import NewItem from "../components/NewItem";
import PleaseLogin from "./LoginMessage/page";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

//Returns data from db card table.
function getCards() {
  return prisma.card.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

//Creates a new card. This is called at the same time as a delete function, to make the illusion of an edit.
async function edit(data: FormData) {
  //Server code only
  "use server";
  const title = data.get("editTitle")?.valueOf();
  const text: string = data.get("editText")?.valueOf() as string;
  if (typeof title === "string" && title !== "") {
    if (text !== "") {
      await prisma.card.create({ data: { title, text } });
      redirect("../adminn");
    }
  }
}

//Deletes card from table
async function deleteThisCard(id: string) {
  "use server";
  await prisma.card.delete({ where: { id } });
  getCards();
  //Updates page
  revalidatePath("/adminn");
}

export default async function AdminCards() {
  const cards = await getCards();
  return (
    <div>
      <div>
        <header className="items-center mb-4">
          <NewItem />

          <PleaseLogin />
          <ul className="pl-4">
            {cards.map((card) => (
              <div key={card.id}>
                <CardItem
                  {...card}
                  mainPage={false}
                  edit={edit}
                  deleteThisCard={deleteThisCard}
                />
              </div>
            ))}
          </ul>
        </header>
      </div>
    </div>
  );
}
