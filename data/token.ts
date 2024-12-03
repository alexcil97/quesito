import { db } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"

export const getVerificactionByToken = async (token: string) => {
    try {
        const verificacionToken = await db.verificationToken.findUnique({
            where: { token }
        })
        return verificacionToken
    } catch {
        return null
    }
}

export const getVerificactionTokenByEmail = async (email: string) => {
    try {
        const verificacionToken = await db.verificationToken.findFirst({
            where: { email }
        })
        return verificacionToken
    } catch {
        return null
    }
}

export const generateVerificationToken = async (email: string) => {
    const token: string = uuidv4()

    const expiresTime = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificactionTokenByEmail(email)

    if (existingToken) {
        await db.verificationToken.delete({
            where: { id: existingToken.id }
        })
    }

    const createaVerificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires: expiresTime,
        }
    })
    return createaVerificationToken
}