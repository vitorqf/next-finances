import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { PiGearSix } from "react-icons/pi";
import { SidebarButton } from "./SidebarButton";

export function Sidebar() {
  return (
    <div className="bg-gray-950 w-20 p-4 border-r-2 max-h-full border-r-white border-opacity-10 flex flex-col items-center gap-2 box-border">
      <Image src="/vercel.svg" alt="Create Next App" width={200} height={200} />
      <nav className="flex flex-col h-full justify-between">
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
