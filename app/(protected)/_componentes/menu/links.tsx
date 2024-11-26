import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TiMessages } from "react-icons/ti";
import { IoMdCloudUpload } from "react-icons/io";


const sidebarLinks = [
  { href: "/home", label: "Home", Icon: FaHome },
  { href: "/publication", label: "Publication", Icon: IoMdCloudUpload },
  { href: "/search", label: "Search", Icon: FaSearch },
  { href: "/message", label: "Messages", Icon: TiMessages },
  { href: "/profile", label: "Profile", Icon: CgProfile  },
  
];

export default function SidebarLinks() {
  const pathName = usePathname();

  return (
    <>
      {sidebarLinks.map((link) => {
        return (
          <Link
            href={link.href}
            key={link.href}
            className="flex p-1 grow items-center border-0 justify-center gap-1 rounded-md"
          >
            <Button
              variant={pathName === link.href ? "default" : "outline"}
              className="flex h-[50px] grow items-center border-0 justify-center gap-2 rounded-md p3 font-medium"
            >
              <link.Icon className={`text-lg ${pathName === link.href}`} />
              <span className={`hidden md:block ${pathName === link.href}`}>
                {link.label}
              </span>
            </Button>
          </Link>
        );
      })}
    </>
  );
}
