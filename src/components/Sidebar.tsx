import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { PiGearSix } from "react-icons/pi";
import { SidebarButton } from "./SidebarButton";

export function Sidebar() {
  return (
    <div className="box-border flex max-h-screen min-h-screen w-20 flex-col items-center gap-2 border-r-2 border-r-white border-opacity-10 bg-gray-950 p-4">
      <Image src="/vercel.svg" alt="Create Next App" width={200} height={200} />
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

        <ul>
          <li>
            <SidebarButton
              icon={<PiGearSix color="#9CA3AF" size={24} />}
              label="Home"
            />
          </li>
        </ul>
      </nav>
    </div>
  );
}
