import { Transaction } from "@/models/Transaction";
import { formatAmout } from "@/utils";
import moment from "moment";
import "moment/locale/pt-br";
import { BiPencil } from "react-icons/bi";
import { CategoryBadge } from "./CategoryBadge";

moment.locale("pt-br");

export function TransactionTable({
  transactions,
  search,
  tab,
}: {
  transactions: Transaction[];
  search: string;
  tab: string;
}) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b-2 border-white border-opacity-10">
          <th className="w-96 px-6 py-3 text-left text-sm font-semibold leading-5 text-slate-400">
            Descrição
          </th>
          <th className="w-60 px-6 py-3 text-left text-sm font-semibold leading-5 text-slate-400">
            Valor
          </th>
          <th className="w-60 px-6 py-3 text-left text-sm font-semibold leading-5 text-slate-400">
            Categoria
          </th>
          <th className="w-60 px-6 py-3 text-left text-sm font-semibold leading-5 text-slate-400">
            Data
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {transactions
          .filter((transaction) =>
            transaction.title.toLowerCase().includes(search.toLowerCase()),
          )
          .filter((transaction) => {
            switch (tab) {
              case "Todas":
                return true;
              case "Entrada":
                return transaction.amount > 0;
              case "Saída":
                return transaction.amount < 0;
              default:
                return true;
            }
          })
          .map((transaction) => (
            <tr key={transaction.id}>
              <td className="w-96 border-b-2 border-white border-opacity-10 p-6 font-medium">
                {transaction.title}
              </td>
              <td
                className={`w-60 border-b-2 border-white border-opacity-10 p-6 font-medium ${
                  transaction.amount > 0 ? "text-emerald-600" : "text-slate-400"
                }`}
              >
                {formatAmout(Math.abs(transaction.amount))}
              </td>

              <td className="w-60 border-b-2 border-white border-opacity-10 p-6 text-slate-400">
                <CategoryBadge category={transaction.category} />
              </td>

              <td className="w-60 whitespace-break-spaces border-b-2 border-white border-opacity-10 p-6 text-slate-400">
                {moment(transaction.date).format("ddd[\n]DD/MM")}
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
  );
}
