"use client";

import { logout } from "@/actions/logout";

interface LogoutButtonsProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonsProps) => {
  const onClick = () => {
    localStorage.clear();
    sessionStorage.clear();

    logout()
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
