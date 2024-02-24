import { Transaction as Model } from "@/models/Transaction";
import { formatAmout, formatTime } from "@/utils";
import { BiPencil } from "react-icons/bi";

export function TransactionItem({ transaction }: { transaction: Model }) {
  return (
    <li className="w-full flex justify-between items-center text-sm py-4 font-medium ">
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
      <p className="text-slate-400 w-24 whitespace-break-spaces">
        {formatTime(transaction.date)}
      </p>
      <button>
        <BiPencil className="text-gray-400" size={24} />
      </button>
    </li>
  );
}
