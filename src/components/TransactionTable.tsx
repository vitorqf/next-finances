import { Transaction } from "@/models/Transaction";
import { formatAmout, formatTime } from "@/utils";
import { BiPencil } from "react-icons/bi";
import { CategoryBadge } from "./CategoryBadge";

export function TransactionTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <div className="box-border h-full max-h-80 overflow-y-auto rounded-lg border-l-2 border-r-2 border-t-2 border-white border-opacity-10 scrollbar-thin scrollbar-track-slate-600 scrollbar-thumb-slate-300">
      <table className="w-full ">
        <thead>
          <tr className="border-b-2 border-white border-opacity-10">
            <th className="px-6 py-3 text-left text-sm font-semibold leading-5 text-slate-400">
              Descrição
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold leading-5 text-slate-400">
              Valor
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold leading-5 text-slate-400">
              Categoria
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold leading-5 text-slate-400">
              Data
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border-b-2 border-white border-opacity-10 p-6 font-medium">
                {transaction.title}
              </td>
              <td
                className={`border-b-2 border-white border-opacity-10 p-6 font-medium ${
                  transaction.amount > 0 ? "text-emerald-600" : "text-slate-400"
                }`}
              >
                {formatAmout(Math.abs(transaction.amount))}
              </td>

              <td className="border-b-2 border-white border-opacity-10 p-6 text-slate-400">
                <CategoryBadge category={transaction.category} />
              </td>

              <td className="border-b-2 border-white border-opacity-10 p-6 text-slate-400">
                {formatTime(transaction.date)}
              </td>

              <td className="border-b-2 border-white border-opacity-10 p-6 text-center text-slate-400">
                <button className="font-medium text-slate-400">
                  <BiPencil size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
