"use client"

import { useEffect } from "react"
import { useFriends } from "../hook/use-Friends-user"

export default function PostFriends() {
    const { friends, error, refetch } = useFriends()

    useEffect(() => {
        const interval = setInterval(() => {
            refetch()
        }, 5000)
        return () => clearInterval(interval)
    }, [refetch])

    if(error) return <p>Error: {error}</p>

    if(friends.length === 0) return <p>No tienes amigos!</p>

    console.log(friends)

    return(
        <div>
            {friends.map((id) => (
                <div>
                    
                </div>
            ))}
        </div>
    )
}