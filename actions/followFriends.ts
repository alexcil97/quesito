"use server"
import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { FriendStatus } from "@prisma/client"

export const toggleFollowUser = async (friendId: string, newStatus: FriendStatus = "UNFOLLOW"): Promise<FriendStatus> => {
  const user = await currentUser()
  if (!user) {
    throw new Error("No se encontró la sesión.")
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    throw new Error("Usuario no encontrado.")
  }
  if (friendId === dbUser.id) {
    throw new Error("No puedes seguirte a ti mismo.")
  }

  try {
    const existingFollowStatus = await db.friends.findUnique({
      where: {
        userId_friendId: {
          userId: dbUser.id,
          friendId
        }
      }
    });

    if (existingFollowStatus) {
      await db.friends.update({
        where: {
          userId_friendId: {
            userId: dbUser.id,
            friendId
          }
        },
        data: {
          status: newStatus
        }
      })
      return newStatus
    } else {
      const createStatus = await db.friends.create({
        data: {
          userId: dbUser.id,
          friendId,
          status: newStatus
        },
        select: {
          status: true
        }
      })

      return createStatus.status
    }

  } catch (err) {
    console.error("Error al actualizar el estado de seguimiento:", err)
    throw new Error("Hubo un problema al actualizar el estado de seguimiento.")
  }
}