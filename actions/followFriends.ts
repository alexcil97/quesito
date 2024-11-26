"use server";
import { db } from "@/lib/db";

export const followFriend = async (id_user: string, id_friend: string) => {
  try {
    console.log("Adding friend to database...");
    await db.friends.create({
      data: {
        userId: id_user,
        friendId: id_friend,
      },
    });
    return { success: "Se ha añadido tu amigo correctamente" };
  } catch (error) {
    console.error("Error while adding friend to database:", error);
    return { error: "Error al añadir en la lista de amigos" };
  }
};
