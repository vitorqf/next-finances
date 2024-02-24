"use client";

import { BalanceChart } from "@/components/BalanceChart";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { RecentTransactions } from "@/components/RecentTransactions";
import { SectionTitle } from "@/components/SectionTitle";
import { TransactionTable } from "@/components/TransactionTable";
import { Card as CardModel } from "@/models/Card";
import { Transaction } from "@/models/Transaction";
import { formatAmout } from "@/utils";
import { generateCsv, mkConfig } from "export-to-csv";
import { useCallback, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { RiDownloadCloudLine } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";

export function Content({
  transactions,
  card,
  total,
}: {
  transactions: Transaction[];
  card: CardModel;
  total: number;
}) {
  const [search, setSearch] = useState("");

  const handleExportToCSV = useCallback(() => {
    const csvConfig = mkConfig({ useKeysAsHeaders: true });
    const csvData = transactions.map((transaction) => ({
      titulo: transaction.title,
      valor: formatAmout(transaction.amount),
      categoria: transaction.category.title,
      data: transaction.date,
    }));
    const csv = generateCsv(csvConfig)(csvData);
    const link = document.createElement("a");
    link.download = `${card.title}-${new Date().getTime()}-transactions.csv`;
    link.href = `data:text/csv;charset=utf-8,${csv}`;
    link.click();
    console.log("Exporting to CSV");
  }, [card.title, transactions]);

  return (
    <div className="box-border h-full max-h-screen flex-1 bg-gray-950 p-4">
      <Header
        title="Seus cartões"
        subtitle="Bem-vindo(a) de volta, Vitor!"
        actions={
          <>
            <Button
              title="Ver extrato"
              variant="secondary"
              icon={<TbRefresh size={20} />}
            />
            <Button title="Adicionar cartão" />
          </>
        }
      />
      <div className="flex h-full gap-16 py-8">
        <section className="flex flex-col gap-8">
          <Card
            type={card.type}
            flag={card.flag.toLowerCase()}
            title={card.title}
            digits={card.last_digits}
          />
          {transactions && <RecentTransactions transactions={transactions} />}
        </section>

        <section className="flex h-full flex-1 flex-col gap-8">
          <div>
            <SectionTitle text="Movimentação ao longo do tempo" />
            <p className="text-slate-400">Compare os gastos ao longo do mês</p>
          </div>
          <div className="h-60">
            <BalanceChart transactions={transactions} />
          </div>
          <div className="h-full max-h-96 flex-1 overflow-y-auto rounded-lg border-2 border-white border-opacity-10 scrollbar-thin scrollbar-track-slate-600 scrollbar-thumb-slate-300">
            <div className="sticky right-0 top-0 flex items-center justify-between border-b-2 border-white border-opacity-10 bg-gray-950 p-6">
              <div className="flex items-center gap-2">
                <SectionTitle text="Últimas transações" />
                <p className="rounded-md border-2 border-slate-600 px-2 py-1 text-xs font-medium text-slate-100">
                  {total} transações
                </p>
              </div>
              <div>
                <Button
                  title="Exportar CSV"
                  variant="secondary"
                  icon={<RiDownloadCloudLine size={20} />}
                  onClick={handleExportToCSV}
                />
              </div>
            </div>
            <div className="flex items-center justify-between px-6 py-3">
              <div />

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
            </div>
            <TransactionTable transactions={transactions} search={search} />
          </div>
        </section>
      </div>
    </div>
  );
}
