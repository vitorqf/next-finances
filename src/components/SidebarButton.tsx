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
      className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-300 hover:bg-gray-800 ${
        active ? "bg-gray-800 hover:bg-gray-700" : ""
      }`}
    >
      {icon}
    </Link>
  );
}
