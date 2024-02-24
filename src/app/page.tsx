import { BalanceChart } from "@/components/BalanceChart";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { RecentTransactions } from "@/components/RecentTransactions";
import { SectionTitle } from "@/components/SectionTitle";
import { TransactionTable } from "@/components/TransactionTable";
import api from "@/lib/api";
import { Card as CardModel } from "@/models/Card";
import { TbRefresh } from "react-icons/tb";

export default async function Home() {
  const cards: CardModel[] = await api.cards.get();
  const selectedCard = cards[1];
  const { results: transactions } = await api.transactions.get({
    filter: "card",
    filterBy: selectedCard.title,
  });

  return (
    <div className="box-border h-full max-h-screen flex-1 bg-gray-950 p-8">
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
            type={selectedCard.type}
            flag={selectedCard.flag.toLowerCase()}
            title={selectedCard.title}
            digits={selectedCard.last_digits}
          />
          {transactions && (
            <RecentTransactions transactions={transactions.slice(0, 6)} />
          )}
        </section>

        <section className="flex h-full flex-1 flex-col gap-8">
          <div>
            <SectionTitle text="1s ao longo do tempo" />
            <p className="text-slate-400">Compare os gastos ao longo do mês</p>
          </div>
          <div className="h-72">
            <BalanceChart transactions={transactions} />
          </div>
          <div className="flex-1">
            <TransactionTable transactions={transactions} />
          </div>
        </section>
      </div>
    </div>
  );
}
