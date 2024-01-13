"use server";
import { prisma } from "./db";

let users: any = {};
//Finds the users from the db with id: 1
async function findUsers() {
  users = await prisma.user.findUnique({
    where: {
      id: "1",
    },
  });
}

const cards = findUsers();

export default async function GetUser() {
  await findUsers();
  return users;
}
