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
  console.log(cards);
  const { results: transactions } = await api.transactions.get({
    filter: "card",
    filterBy: selectedCard.title,
  });

  return (
    <div className="bg-gray-950 h-full max-h-screen flex-1 p-8 box-border">
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
      <div className="py-8 flex gap-16 h-full">
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

        <section className="flex flex-1 h-full flex-col gap-8">
          <div>
            <SectionTitle text="Saldo ao longo do tempo" />
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
