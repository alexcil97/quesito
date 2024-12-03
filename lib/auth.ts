import { auth } from "@/auth";
// recupera la sesion del usuario autentificado
export const currentUser = async () => {
    const session = await auth();

    return session?.user;
}

export const currentRole = async () => {
    const session = await auth();

    return session?.user?.role;
}