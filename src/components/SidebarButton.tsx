import Link from "next/link";
import { ReactNode } from "react";

export function SidebarButton({
  icon,
  label,
  active,
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={label}
      className={`h-12 w-12 flex justify-center items-center rounded-lg hover:bg-gray-800 transition-colors duration-300 ${
        active ? "bg-gray-800 hover:bg-gray-700" : ""
      }`}
    >
      {icon}
    </Link>
  );
}
