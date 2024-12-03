"use server";

import { db } from "@/lib/db";

export const unfollowFriend = async (id_user: string, id_friend: string) => {
  try {
    console.log("Deleting friend from database...");
    await db.friends.delete({
      where: {
        userId_friendId: {
          userId: id_user,
          friendId: id_friend,
        },
      },
    });
    return { success: "Se ha eliminado tu amigo correctamente" };
  } catch (error) {
    console.error("Error while deleting friend from database:", error);
    return { error: "Error al eliminar en la lista de amigos" };
  }
};
