"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const getProfileById = async (id?: string) => {

    const user = await currentUser()

    try {
        const user = await db.user.findUnique({ where: { id } })
        return user
    } catch (error) {
        return null
    }
}
