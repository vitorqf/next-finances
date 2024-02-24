import { Transaction as Model } from "@/models/Transaction";
import { formatAmout } from "@/utils";
import { BiPencil } from "react-icons/bi";

export function TransactionItem({ transaction }: { transaction: Model }) {
  return (
    <li className="flex w-full items-center justify-between py-4 text-sm font-medium ">
      <div>
        <h4>{transaction.title}</h4>
        <p
          className={`w-36 ${
            transaction.amount > 0 ? "text-emerald-600" : "text-slate-400"
          }`}
        >
          {transaction.amount < 0 ? "- " : "+ "}
          {formatAmout(Math.abs(transaction.amount))}
        </p>
      </div>
      <p className="w-24 whitespace-break-spaces text-slate-400">
        {transaction.date}
      </p>
      <button>
        <BiPencil className="text-gray-400" size={24} />
      </button>
    </li>
  );
}
