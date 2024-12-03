"use server";
import { db } from "@/lib/db";

export const fetchFilteredUser = async (
  query: string,
  excludedUserId: string
) => {
  const ITEMS_PER_PAGE = 4;

  try {
    const friends = await db.friends.findMany({
      where: { userId: excludedUserId },
      select: { friendId: true },
    });

    const users = await db.user.findMany({
      where: {
        AND: [
          query
            ? {
                OR: [
                  { nombre: { contains: query, mode: "insensitive" } },
                  { apellido: { contains: query, mode: "insensitive" } },
                ],
              }
            : {},
          { id: { not: excludedUserId } },
        ],
      },
      orderBy: { id: "asc" },
      take: ITEMS_PER_PAGE,
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
