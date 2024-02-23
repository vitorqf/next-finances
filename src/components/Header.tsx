import { ReactNode } from "react";

export function Header({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle: string;
  actions: ReactNode;
}) {
  return (
    <header className="p-4 border-b-2 border-b-white border-opacity-10 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-slate-400">{subtitle}</p>
      </div>
      <div className="flex gap-4 mt-4">{actions}</div>
    </header>
  );
}
