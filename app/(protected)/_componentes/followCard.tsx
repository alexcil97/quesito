"use client";

import { toggleFollowUser } from "@/actions/followFriends";
import { getStatusFollowUser } from "@/actions/getFriends"
import { FriendStatus } from "@prisma/client";
import { useEffect, useState } from "react"

interface CardUserProps {
  nombre: string
  apellido: string
  email: string
  userId: string
  profile_picture: string
  isFollowing?: boolean
  onToggleFollow?: (userid: string, newStatus: FriendStatus) => void;
}

export function FollowCard({
  nombre,
  apellido,
  email,
  profile_picture,
  userId,
  isFollowing = false,
  onToggleFollow,
}: CardUserProps) {

  const [followStatus, setFollowStatus] = useState<string>(isFollowing ? "FOLLOW" : "UNFOLLOW");
  const [loadingStatus, setLoadingStatus] = useState(false)

  useEffect(() => {
    setLoadingStatus(true);
    getStatusFollowUser(userId)
      .then((status) => {
        console.log("Follow status:", status);
        //@ts-ignore
        setFollowStatus(status)
      })
      .catch((err) => {
        console.error("Error", err)
      })
      .finally(() => {
        setLoadingStatus(false)
      })
  }, [userId,followStatus])

  const handleToggleFollow = () => {
    setLoadingStatus(true)
    const newStatus = followStatus === "FOLLOW" ? "UNFOLLOW" : "FOLLOW"

    if (onToggleFollow) {
      setFollowStatus(newStatus)
      toggleFollowUser(userId || '', newStatus)
    }
  }

  return (
    <div className="py-8 px-8 max-w-full space-y-2 bg-gray-600 border-white border border-solid rounded-xl shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6 m-3">
      <img
        className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
        src={profile_picture || "/images/erin-lindford.jpg"}
        alt={`${nombre} ${apellido}`}
      />
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">{nombre} {apellido}</p>
          <p className="text-sm text-slate-400">{email}</p>
        </div>
      </div>
      <div className="ml-auto">
        <button
          onClick={handleToggleFollow}
          className={`text-xl px-4 py-1 font-semibold rounded-full border ${followStatus === "UNFOLLOW"
            ? "text-white bg-red-500 hover:bg-red-600 border-red-500"
            : "text-black border-indigo-200 hover:bg-indigo-600 hover:text-white"
            } focus:outline-none focus:ring-2 ${followStatus === "UNFOLLOW"
              ? "focus:ring-red-600"
              : "focus:ring-indigo-600"
            } focus:ring-offset-2`}
        >
          {loadingStatus ? "Loading..." : followStatus}
        </button>
      </div>
    </div>
  );
}
