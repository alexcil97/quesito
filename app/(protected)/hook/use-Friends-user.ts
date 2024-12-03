import { useEffect, useState } from "react";
import { userCurrentUser } from "./use-current-user";
import { getListFriendIds } from "@/actions/getListFriendIds";

export function useFriends() {
  const user = userCurrentUser();
  const [friends, setFriends] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refetch = () => {
    setLoading(true);
    setError(null);
    if (user?.session?.id) {
      getListFriendIds(user?.session?.id)
        .then((friends) => {
          if (Array.isArray(friends)) {
            setFriends(friends);
          } else if (friends.error) {
            setError("Hubo un error al cargar los amigos");
          }
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [user]);

  return {
    friends,
    loading,
    error,
    refetch,
  };
}
