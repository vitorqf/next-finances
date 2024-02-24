import { Transaction } from "@/models/Transaction";
import { formatAmout } from "@/utils";
import { useMemo } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { SectionTitle } from "./SectionTitle";

export function RecentTransactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const totalBalance = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      return Math.abs(acc) + Math.abs(transaction.amount);
    }, 0);
  }, [transactions]);

  const totalIncome = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      return acc + (transaction.amount > 0 ? transaction.amount : 0);
    }, 0);
  }, [transactions]);

  const totalOutcome = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      console.log(acc, transaction.amount);
      return acc + (transaction.amount < 0 ? transaction.amount : 0);
    }, 0);
  }, [transactions]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <SectionTitle text="Visão geral" />
        <PiDotsThreeOutlineVerticalFill className="text-gray-400" />
      </div>
      <ul className="flex flex-col gap-4">
        <li className="flex items-center justify-between">
          <span className="text-sm font-medium leading-4 text-slate-400">
            Movimentação
          </span>
          <span className="text-2xl font-semibold leading-8">
            {formatAmout(totalBalance)}
          </span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-sm font-medium leading-4 text-emerald-500">
            Entrada
          </span>
          <span className="text-2xl font-semibold leading-8">
            {formatAmout(totalIncome)}
          </span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-sm font-medium leading-4 text-rose-500">
            Saída
          </span>
          <span className="text-2xl font-semibold leading-8">
            {formatAmout(Math.abs(totalOutcome))}
          </span>
        </li>
      </ul>
      <button className="w-full text-sm font-medium text-indigo-400">
        Ver todas transações
      </button>
    </div>
  );
}
