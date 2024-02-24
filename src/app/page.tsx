import api from "@/lib/api";
import { Card as CardModel } from "@/models/Card";
import moment from "moment";
import { Content } from "./content";

export default async function Home() {
  const cards: CardModel[] = await api.cards.get();
  const currentMonth = moment().toDate();
  const selectedCard = cards[0];
  const { results: transactions, total } = await api.transactions.get({
    limit: 999,
    filter: "card",
    filterBy: selectedCard.title,
    date: currentMonth,
  });

  return (
    <Content transactions={transactions} card={selectedCard} total={total} />
  );
}
