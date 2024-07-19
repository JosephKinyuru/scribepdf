"use server"

import { db } from '@/db'
import { currentUser } from '@clerk/nextjs/server'

export const getAuthStatus = async () => {
    const user = await currentUser()

    if(!user?.id || !user?.primaryEmailAddress?.emailAddress) {
        throw new Error("Invalid user data")
    }

    const existingUser = await db.user2.findFirst({
        where: { id: user.id},
    })

    if(!existingUser) {
        await db.user2.create({
            data: {
                id: user.id,
                email: user.primaryEmailAddress!.emailAddress,
            }
        })
    }

    return { success: true}
}