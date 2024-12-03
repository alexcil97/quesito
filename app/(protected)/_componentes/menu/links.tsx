//importaciones
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TiMessages } from "react-icons/ti";
import { IoMdCloudUpload } from "react-icons/io";

//arreglo de enlaces de barra lateral(contiene ruta, texto de enlace e iconos) 
const sidebarLinks = [
  { href: "/home", label: "Home", Icon: FaHome },
  { href: "/publication", label: "Publication", Icon: IoMdCloudUpload },
  { href: "/search", label: "Search", Icon: FaSearch },
  { href: "/message", label: "Messages", Icon: TiMessages },
  { href: "/profile", label: "Profile", Icon: CgProfile  },
  
];

export default function SidebarLinks() {
  // constante que obtiene la ruta actual en la que estamos(sirve para poder resaltar el enlace activo)
  const pathName = usePathname();

  return (
    <>
      {sidebarLinks.map((link) => {
        // mapeo del enlace 'SidebarsLinks' y renderiza un enlace para cada elemento
        return (
          <Link
            href={link.href}//ruta del enlace
            key={link.href}//clave unica de la ruta
            className="flex p-1 grow items-center border-0 justify-center gap-1 rounded-md"
          >
            <Button
              variant={pathName === link.href ? "default" : "outline"}// aplica estilo diferente si es la ruta actual
              className="flex h-[50px] grow items-center border-0 justify-center gap-2 rounded-md p3 font-medium"
            >
              <link.Icon className={`text-lg ${pathName === link.href}`}//muestra el icono del enlace y lo resalta si es el actual
              />
              <span className={`hidden md:block ${pathName === link.href}`}// muestra el texto del enlace
              >
                {link.label}
              </span>
            </Button>
          </Link>
        );
      })}
    </>
  );
}
