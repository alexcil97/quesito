"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const getStatusFollowUser = async (friendId: string) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("No se encontró la sesión.");
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    throw new Error("Usuario no encontrado.");
  }

  try {
    const followStatus = await db.friends.findUnique({
      where: {
        userId_friendId: {
          userId: dbUser.id,
          friendId: friendId
        }
      },
    })
    if (!followStatus) {
      console.log("No se encontró la relación de seguimiento. Retornando estado 'UNFOLLOW'.");
      return "FOLLOW"
    }
    return followStatus.status
  } catch (err) {
    console.error("Error al verificar el estado de seguimiento:", err);
    throw new Error("Hubo un problema al verificar el estado de seguimiento.");
  }
};
