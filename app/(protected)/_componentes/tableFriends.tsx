import { useEffect, useState } from "react";
import { userCurrentUser } from "../hook/use-current-user";
import { User } from "@/app/types/models";
import { unfollowFriend } from "@/actions/unfollowFriends";

export interface friendsUSer {
    id: string
}

export default function TableFriends({ id }: friendsUSer) {
    const userId = userCurrentUser()
    const [users, setUsers] = useState<User[]>([])


    const handleUnfollow = async (friendId: string) => {
        if (!userId || !userId?.session?.id) return

        try {
            await unfollowFriend(userId.session.id, friendId)
            setUsers(prevUsers => prevUsers.filter(user => user.id !== friendId))

        } catch (err) {
            console.error("Error al elimnar amigo")
        }

    }

    return (
        <>
            {users.map(user => (
                <div key={user.id} className="py-8 px-8 max-w-full space-y-2 bg-gray-600 border-white border border-solid rounded-xl shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6 m-3">
                    <img
                        className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
                        src={user.profile_picture || "/images/erin-lindford.jpg"}
                        alt={`${user.nombre} ${user.apellido}`}
                    />
                    <div className="text-center space-y-2 sm:text-left">
                        <div className="space-y-0.5">
                            <p className="text-lg text-black font-semibold">{user.nombre} {user.apellido}</p>
                            <p className="text-sm text-slate-400">{user.email}</p>
                        </div>
                    </div>
                    <div className="ml-auto">
                        <button
                            onClick={() => handleUnfollow(user.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                        >
                            Dejar de seguir
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}