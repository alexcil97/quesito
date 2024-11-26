"use server";

import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/lib/db";

export const fetchFilteredUser = async (
  query: string,
  currentPage: number,
  excludedUserId: string
) => {
  noStore();
  const ITEMS_PER_PAGE = 4;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const friends = await db.friends.findMany({
      where: { userId: excludedUserId },
      select: { friendId: true },
    });

    const friendIds = friends.map((friends) => friends.friendId);

    const users = await db.user.findMany({
      where: {
        AND: [
          {
            OR: [
              { nombre: { contains: query, mode: "insensitive" } },
              { apellido: { contains: query, mode: "insensitive" } },
            ],
          },
          { id: { not: excludedUserId } },
          { id: { notIn: friendIds } },
        ],
      },
      orderBy: { id: "asc" },
      take: ITEMS_PER_PAGE,
      skip: offset,
      include: {
        friends: true,
      },
    });

    return users;
  } catch (err) {
    console.log("Error base", err);
    throw new Error("fallo al hacer fetchin");
  }
};
