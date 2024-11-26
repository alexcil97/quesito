  "use server";

import { db } from "@/lib/db";

export const getListFriendIds = async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        friends: true,
      },
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    const friendIds = user.friends.map((friendship) => friendship.friendId);

    return friendIds;
  } catch (err) {
    return { error: "error en la base de datos" };
  }
};
