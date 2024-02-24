import { Transaction } from "@/models/Transaction";
import { formatAmout, formatTime } from "@/utils";

export function TransactionTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <div className="max-h-80 h-full border-l-2 border-r-2 border-t-2 overflow-y-auto rounded-lg border-white border-opacity-10 box-border scrollbar-thin scrollbar-track-slate-600 scrollbar-thumb-slate-300">
      <table className="w-full ">
        <thead>
          <tr className="border-b-2 border-white border-opacity-10">
            <th className="text-slate-400 font-medium text-sm leading-5 text-left px-6 py-3">
              Descrição
            </th>
            <th className="text-slate-400 font-medium text-sm leading-5 text-left px-6 py-3">
              Valor
            </th>
            <th className="text-slate-400 font-medium text-sm leading-5 text-left px-6 py-3">
              Categoria
            </th>
            <th className="text-slate-400 font-medium text-sm leading-5 text-left px-6 py-3">
              Data
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="p-6 border-b-2 border-white border-opacity-10">
                {transaction.title}
              </td>
              <td
                className={`p-6 border-b-2 border-white border-opacity-10 ${
                  transaction.amount > 0 ? "text-emerald-600" : "text-slate-400"
                }`}
              >
                {formatAmout(transaction.amount)}
              </td>

              <td className="p-6 border-b-2 border-white border-opacity-10 text-slate-400">
                {transaction.category.title}
              </td>

              <td className="p-6 border-b-2 border-white border-opacity-10 text-slate-400">
                {formatTime(transaction.date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
