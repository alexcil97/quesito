"use server";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { PublicationValidation } from "@/validations";
import { z } from "zod";

export const postPublication = async (
  values: z.infer<typeof PublicationValidation>
) => {
  const validationsFields = PublicationValidation.safeParse(values);

  if (!validationsFields.success)
    return { error: "error en la validación de datos" };

  const user = await currentUser();

  if (!user) {
    return { error: "Usuario no autenticado." };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Usuario no registrado en la base de datos." };
  }

  const { url_image, publication_message } = validationsFields.data;

  await db.publication.create({
    data: {
      url_image,
      publication_message,
      id_user: dbUser.id,
    },
  });

  return {
    success: "Se creado una nueva publicación",
  };
};
