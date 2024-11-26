"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const getUsers = async () => {
  const user = await currentUser();

  if (!user) {
    return { error: "Usuario no autenticado." };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Usuario no registrado en la base de datos." };
  }

  // Obtiene todos los usuarios con los campos seleccionados
  const users = await db.user.findMany({
    select: {
      id: false,
      nombre: true,
      apellido: true,
      email: true,
      profile_picture: true,
      role: false,
      edad: false,
      createdAt: false,
    },
  });

  return users;
};
