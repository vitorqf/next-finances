import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { RecentTransactions } from "@/components/RecentTransactions";
import api from "@/lib/api";

export default async function Home() {
  const transactions = await api.transactions.get();

  return (
    <div className="bg-gray-950 h-full max-h-screen flex-1 p-8 box-border">
      <Header
        title="Seus cartões"
        subtitle="Bem-vindo(a) de volta, Vitor!"
        actions={<button>Click me</button>}
      />
      <div className="py-8 flex items-center gap-16">
        <section className="flex flex-col gap-8">
          <Card
            type="Crédito"
            flag="mastercard"
            title="Cartão novo"
            digits={1234}
          />
          <RecentTransactions transactions={transactions.slice(0, 6)} />
        </section>
        <section className="flex flex-1 flex-col gap-8">
          <Card type="Crédito" flag="visa" title="Cartão novo" digits={5678} />
          <Card
            type="Crédito"
            flag="mastercard"
            title="Cartão novo"
            digits={9012}
          />
        </section>
      </div>
    </div>
  );
}
