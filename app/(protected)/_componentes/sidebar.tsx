"use client";
import Image from "next/image";
import SidebarLinks from "./menu/links";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/app/auth/logout/logout-button";

export default function SideBar() {
  return (
    <div className="flex flex-col md:container md:mx-auto  border border-y-transparent border-l-transparent  border-r-purple-600	 h-full">
      <div className="Logo p-2">
        <img src="/images/logo.jpeg" alt="Logo" className="logo" />
      </div>
      <div>
        <SidebarLinks />
      </div>
      <div className="flex justify-center mt-auto mb-5 p-2 ">
        <LogoutButton>
          <Button className="flex h-[50px] grow items-center border-0 justify-center gap-2 rounded-md p3 font-medium w-full">
            Logout 
          </Button>
        </LogoutButton>
      </div>
    </div>
  );
}
