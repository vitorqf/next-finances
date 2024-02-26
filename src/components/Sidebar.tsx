import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { PiGearSix } from "react-icons/pi";
import { SidebarButton } from "./SidebarButton";

export function Sidebar() {
  const { user, logout, loading } = useAuth();

  return (
    <div className="box-border flex max-h-screen min-h-screen w-20 flex-col items-center gap-2 border-r-2 border-r-white border-opacity-10 bg-gray-950 p-4">
      <nav className="flex h-full flex-col justify-between">
        <ul>
          <li>
            <SidebarButton
              icon={<AiOutlineHome color="#9CA3AF" size={24} />}
              label="Home"
              active
            />
          </li>
        </ul>

        <ul className="flex flex-col gap-2">
          <li>
            <SidebarButton
              icon={<PiGearSix color="#9CA3AF" size={24} />}
              label="Home"
            />
          </li>
          <li
            className="relative mt-6 flex h-12 w-full items-center justify-center overflow-hidden rounded-full border-2 border-white border-opacity-20"
            onClick={logout}
          >
            {loading ? (
              <BiUser color="#9CA3AF" size={24} />
            ) : (
              <Image
                src={user?.picture || ""}
                alt="Foto de perfil do usuário"
                fill
              />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
