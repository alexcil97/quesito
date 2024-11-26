import { ExtendedUser } from "@/next-auth";

interface UserInfoProps {
  user?: ExtendedUser;
}

export const UserButton = ({ user }: UserInfoProps) => {
  return (
    <>
      <p className="text-white">{user?.nombre}</p>
    </>
  );
};
