import { Transaction } from "@/models/Transaction";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { TransactionItem } from "./TransactionItem";

export function RecentTransactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg py-4 font-semibold">Transações recentes</h2>
        <PiDotsThreeOutlineVerticalFill className="text-gray-400" />
      </div>
      <ul>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
      <button className="text-sm w-full font-medium text-indigo-400">
        Ver todas transações
      </button>
    </div>
  );
}
