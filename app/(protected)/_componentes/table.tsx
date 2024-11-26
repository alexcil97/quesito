import { User } from "@/app/types/models";
import { userCurrentUser } from "../hook/use-current-user";
import { useEffect, useState } from "react";
import { fetchFilteredUser } from "@/actions/fetchedFilteredUsers";
import { FollowCard } from "./followCard";
import { followFriend } from "@/actions/followFriends";

export default function UserTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const idUser = userCurrentUser();
  const [users, setUsers] = useState<User[]>([]);
  const [following, setFollowing] = useState<{ [key: string]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState(query); // Control interno del query con debounce

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(query);
    }, 300); // Esperar 300ms antes de aplicar el query

    return () => clearTimeout(timeoutId); // Limpiar el timeout si query cambia antes de los 300ms
  }, [query]);

  useEffect(() => {
    async function fetch() {
      if (idUser?.session?.id) {
        const fetchedUsers: User[] = await fetchFilteredUser(
          searchQuery, // Usamos el query procesado con debounce
          currentPage,
          idUser?.session?.id
        );
        setUsers(fetchedUsers);
      }
    }

    fetch();
  }, [searchQuery, currentPage, idUser]);

  const handleFollow = async (userId: string) => {
    setFollowing((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));

    try {
      if (idUser?.session?.id) {
        const response = await followFriend(idUser?.session?.id, userId);
        if (response.error) {
          console.error(response.error);
          setFollowing((prev) => ({
            ...prev,
            [userId]: !prev[userId],
          }));
        } else {
          console.log(
            `Se ha añadido al usuario con ID: ${userId} a la lista de amigos`
          );

          // ACTUALIZAR ESTADO EN CUANTO USUARIO DE A SEGUIR PARA VER CAMBIOS
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === userId ? { ...user, isFollowing: true } : user
            )
          );
        }
      } else {
        console.error("Error: User ID is undefined");
      }
    } catch (err) {
      // REVERTIR EL CAMBIO EN CASO DE ERROR
      setFollowing((prev) => ({
        ...prev,
        [userId]: !prev[userId],
      }));
    }
  };
  return (
    <div className="m-6">
      {users?.map((user) => (
        <FollowCard
          nombre={user.nombre}
          key={user.id}
          apellido={user.apellido || "No especificado"}
          email={user.email}
          profile_picture={user.profile_picture || "/images/erin-lindford.jpg"}
          isFollowing={!!following[user.id]}
          onToggleFollow={() => handleFollow(user.id)}
        />
      ))}
    </div>
  );
}
