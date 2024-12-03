"use client"

import { useSession } from "next-auth/react";
import { UserButton } from "./user-button";

export default function Navbar() {

  const { data: session } = useSession();

  return (
    <nav>
      <h1>Netgram</h1>
        {session ? 
        (
        <>Bienvenido <UserButton user={session.user}/></>
        ) : (
          <p>No hay nadie</p>
        )}

    </nav>
  );
}
