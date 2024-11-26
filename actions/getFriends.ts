"use server";

import { db } from "@/lib/db";

export const getFriends = async (id: string) => {
  try {
    const result = await db.user.findMany({
      where: {
        id: id,
      },
    });

    return result;
  } catch (err) {}
};
