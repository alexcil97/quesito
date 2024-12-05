import NextAuth from "next-auth"
import { db } from "@/lib/db"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getAccountByUserId } from "./data/account"
import { getUserById } from "./data/user"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
import { UserRole } from "@prisma/client"

export const { handlers: { GET, POST }, auth, signIn, signOut, unstable_update,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {

            if (account?.provider !== "credentials") return true

            const existingUser = await getUserById(user.id)

            if (!existingUser || !existingUser.emailVerified) {
                return false
            }

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

                if (!twoFactorConfirmation) {
                    return false
                }
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id }
                })
            }

            return true
        },
        async session({ token, session }) {

            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole
            }

            if (session.user) {
                session.user.twoFactorAuth = token.isTwoFactorEnabled as boolean
            }

            if (session.user) {
                session.user.nombre = token.nombre as string
                session.user.apellido = token.apellido as string
                session.user.email = token.email as string
                session.user.edad = token.edad as string
            }
            return session

        },
        async jwt({ token }) {


            if (!token.sub) return token

            const existingUser = await getUserById(token.sub)

            if (!existingUser) return token

            const existingAccount = await getAccountByUserId(existingUser.id)

            token.isOAuth = !!existingAccount
            token.nombre = existingUser.nombre
            token.apellido = existingUser.apellido
            token.email = existingUser.email
            token.edad = existingUser.edad
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

            return token
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})