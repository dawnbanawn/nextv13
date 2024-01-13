import { prisma } from "./db";
import { CardItem } from "./components/CardItem";

//Returns data from db card table, sorted by date.
function getCards() {
  return prisma.card.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
}

//This function is not used at the moment.
async function deleteThisCard() {
  "use server";
}
//This function is not used at the moment.
async function edit() {
  "use server";
}
//The main home page, showing the 5 newest post-its due to "mainPage = true"
export default async function Home() {
  const cards = await getCards();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl mx-auto mb-2">5 latest post-its</h1>
      </header>
      <ul className="pl-4">
        {cards.map((card) => (
          <CardItem
            key={card.id}
            {...card}
            mainPage={true}
            edit={edit}
            deleteThisCard={deleteThisCard}
          />
        ))}
      </ul>
    </>
  );
}
