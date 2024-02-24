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
    <header className="flex items-center justify-between border-b-2 border-b-white border-opacity-10 py-4">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-slate-400">{subtitle}</p>
      </div>
      <div className="mt-4 flex gap-4">{actions}</div>
    </header>
  );
}
