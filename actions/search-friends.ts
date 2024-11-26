"use server";

import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const searchFriends = async (
  query: string,
  userId: string
): Promise<User[]> => {
  const friends = await db.friends.findMany({
    where: { userId: userId },
    select: { friendId: true },
  });

  const friendIds = friends.map((friends) => friends.friendId);
  const result = await db.user.findMany({
    where: {
      AND: [
        {
          OR: [
            { nombre: { contains: query, mode: "insensitive" } },
            { apellido: { contains: query, mode: "insensitive" } },
          ],
        },
        { id: { not: userId } },
        { id: { notIn: friendIds } },
      ],
    },
  });

  if (result.length > 0) {
    return result;
  } else {
    console.error("No se encontraron usuarios");
    return [];
  }
};
