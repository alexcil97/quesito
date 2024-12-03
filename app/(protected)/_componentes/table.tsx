import { User } from "@/app/types/models";
import { userCurrentUser } from "../hook/use-current-user";
import { useEffect, useState } from "react";
import { fetchFilteredUser } from "@/actions/fetchedFilteredUsers";
import { FollowCard } from "./followCard";
import { useSession } from "next-auth/react";
import { toggleFollowUser } from "@/actions/followFriends";
import { FriendStatus } from "@prisma/client";

export default function UserTable({
  query,
}: {
  query: string;
}) {
  const { data: session } = useSession()
  const idUser = userCurrentUser()
  const [users, setUsers] = useState<User[]>([])
  const [following, setFollowing] = useState<{ [key: string]: boolean }>({});
  const [lastQuery, setLastQuery] = useState<string>("")
  
  if (!session?.user?.id) {
    return <p>Loading...</p>;
  }

  useEffect(() => {

    if (!session?.user?.id) {
      return
    }

    if (!query) {
      fetchFilteredUser("", session.user.id)
        .then((users: User[]) => setUsers(users.slice(0, 4))
      )
        .catch((err) => {
          console.error("Error fetching users:", err);
          setUsers([])
        })
    } else {
      setLastQuery(query)
      fetchFilteredUser(query, session.user.id)
        .then((users: User[]) => setUsers(users.slice(0, 4))
      )
        .catch((err) => {
          console.error("Error fetching users:", err);
          setUsers([])
        })
    }
  }, [query, session, lastQuery])

  const handleToggleFollow = async (userId: string, newStatus: FriendStatus) => {
    toggleFollowUser(userId, newStatus)
    .then(() => {

    })
  
  }

  return (
    <>
      {users?.map((user) => (
        <FollowCard
          userId={user.id}
          nombre={user.nombre}
          key={user.id}
          apellido={user.apellido || "No especificado"}
          email={user.email}
          profile_picture={user.profile_picture || "/images/erin-lindford.jpg"}
          onToggleFollow={handleToggleFollow}
        />
      ))}
    </>
  );
}
