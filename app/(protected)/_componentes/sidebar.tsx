//este codigo se usa para indicar que se ejecutara del lado del cliente
"use client";
//importaciones
import Image from "next/image";
import SidebarLinks from "./menu/links";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/app/auth/logout/logout-button";

export default function SideBar() {
  return (

    <div className="flex flex-row md:flex-col md:container md:mx-auto md:border border-y-transparent border-l-transparent border-r-purple-600 h-1/4 md:h-full">

      <div className="Logo p-2 hidden md:block">
        <img src="/images/logo.jpeg" alt="Logo" className="logo" />
      </div>

      <div className="flex flex-wrap md:flex-col grow justify-between items-center px-2">
        <SidebarLinks />

      <div className="flex justify-center mt-auto mb-0 md:mb-5 p-2 ">
        <LogoutButton>
          <Button className="flex h-[50px] grow items-center border-0 justify-center gap-2 rounded-md p3 font-medium w-full">
            Logout
          </Button>
        </LogoutButton>
      </div>
      </div>

    </div>
  );
}
