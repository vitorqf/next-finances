import { Transaction } from "@/models/Transaction";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { SectionTitle } from "./SectionTitle";
import { TransactionItem } from "./TransactionItem";

export function RecentTransactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <SectionTitle text="Transações recentes" />
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
