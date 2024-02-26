import api from "@/lib/api";
import { Card } from "@/models/Card";
import moment from "moment";
import { cookies } from "next/headers";
import { Content } from "./content";

export default async function Dashboard() {
  const user = cookies().get("@app:user");
  if (!user) {
    return null;
  }
  const parsedUser = JSON.parse(user.value);
  const cards: Card[] = await api.cards.get(parsedUser.accessToken);
  const currentMonth = moment(new Date()).toDate();
  const selectedCard = cards[0];
  const { results: transactions, total } = await api.transactions.get({
    limit: 999,
    filter: "card",
    filterBy: selectedCard.title,
    date: currentMonth,
    token: parsedUser.accessToken,
  });

  return (
    <Content transactions={transactions} card={selectedCard} total={total} />
  );
}
