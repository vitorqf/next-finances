"use client";

import { BalanceChart } from "@/components/BalanceChart";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CardEmpty } from "@/components/CardEmpty";
import { CardOverview } from "@/components/CardOverview";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { Search } from "@/components/Search";
import { SectionTitle } from "@/components/SectionTitle";
import { Sidebar } from "@/components/Sidebar";
import { Tabs } from "@/components/Tabs";
import { TransactionTable } from "@/components/TransactionTable";
import useAuth from "@/hooks/useAuth";
import { Card as CardModel } from "@/models/Card";
import { Category } from "@/models/Category";
import { RiDownloadCloudLine } from "react-icons/ri";
import { useContent } from "./useContent";

export function Content({
  cards,
  categories,
}: {
  cards: CardModel[];
  categories: Category[];
}) {
  const {
    total,
    tabs,
    activeTab,
    search,
    card,
    transactions,
    actions,
    localLoading,
    handleSetActiveTab,
    handleExportToCSV,
    setSearch,
  } = useContent(cards, categories);
  const { user, loading } = useAuth();

  return (
    <main className="flex overflow-hidden">
      <Sidebar />
      {loading ? (
        <Loading />
      ) : (
        <div className="box-border h-screen max-h-screen flex-1 bg-gray-950 p-4">
          <Header
            title="Seus cartões"
            subtitle={`Bem-vindo(a) de volta, ${user?.name.split(" ")[0]}!`}
            actions={actions}
          />
          <div className="flex h-full gap-16 py-8">
            <section className="flex flex-col gap-8">
              {card ? (
                <Card
                  type={card.type}
                  flag={card.flag}
                  title={card.title}
                  digits={card.last_digits}
                />
              ) : (
                <CardEmpty />
              )}
              {transactions && <CardOverview transactions={transactions} />}
            </section>

            <section className="flex h-full flex-1 flex-col gap-8">
              {transactions && (
                <>
                  <div>
                    <SectionTitle text="Movimentação ao longo do tempo" />
                    <p className="text-slate-400">
                      Compare os gastos ao longo do mês
                    </p>
                  </div>
                  <div className="h-60">
                    <BalanceChart transactions={transactions} />
                  </div>
                  <div className="h-full max-h-96 flex-1 overflow-y-auto rounded-lg border-2 border-white border-opacity-10 scrollbar-thin scrollbar-track-slate-600 scrollbar-thumb-slate-300">
                    <div className="sticky right-0 top-0 flex items-center justify-between border-b-2 border-white border-opacity-10 bg-gray-950 p-6">
                      <div className="flex items-center gap-2">
                        <SectionTitle text="Últimas transações" />
                        <p className="rounded-md border-2 border-white border-opacity-20 px-2 py-1 text-xs font-medium text-slate-100">
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
                      <Tabs
                        tabs={tabs}
                        activeTab={activeTab}
                        setActiveTab={handleSetActiveTab}
                      />
                      <Search search={search} setSearch={setSearch} />
                    </div>
                    <TransactionTable
                      transactions={transactions}
                      search={search}
                      tab={tabs[activeTab]}
                    />
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      )}
    </main>
  );
}
