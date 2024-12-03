"use server";

import { signIn, unstable_update } from "@/auth";
import { generateVerificationToken } from "@/data/token";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginValidator } from "@/validations";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

import * as z from "zod";

export const login = async (
  values: z.infer<typeof LoginValidator>,
  callbackUrl?: string | null
) => {
  const validationsFields = LoginValidator.safeParse(values);

  if (!validationsFields.success) {
    return { error: "Revisa los campos" };
  }
  const { email, password } = validationsFields.data;

  const existeUsuario = await getUserByEmail(email);

  if (!existeUsuario || !existeUsuario.email) {
    return { error: "Correo no existe" };
  }

  if (!existeUsuario.password) {
    return { error: "no hay password" };
  }

  const comprobarPassword = await bcrypt.compare(
    password,
    existeUsuario.password
  );

  if (!comprobarPassword) {
    return { error: "Password incorrecta" };
  }

  if (!existeUsuario.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existeUsuario.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { sucess: "Mira tu correo" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
    const dbUser = await getUserByEmail(email);

    if (!dbUser) {
      return { error: "NO existe" };
    }

    await unstable_update({
      user: {
        email: dbUser.email,
        id: dbUser.id,
        profile_picture: dbUser.profile_picture,
        nombre: dbUser.nombre,
        apellido: dbUser.apellido,
        password: dbUser.password,
        role: dbUser.role,
        edad: dbUser.edad,
      },
    });
    return { sucess: "Login Correcto" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales incorrectas" };
        default:
          return { error: "Algo salió mal" };
      }
    }
    throw error;
  }
};
