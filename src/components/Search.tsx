import { IoSearchSharp } from "react-icons/io5";

export function Search({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border-2 border-white border-opacity-20 px-3 py-2 text-slate-400 focus-within:ring-2 focus-within:ring-indigo-500">
      <IoSearchSharp size={20} />

      <input
        type="text"
        placeholder="Pesquisar"
        className="border-none bg-gray-950 text-slate-100 placeholder-slate-400 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
