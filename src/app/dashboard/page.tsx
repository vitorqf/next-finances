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

  let transactions = [];
  let total = 0;
  if (cards.length > 0) {
    const currentMonth = moment(new Date()).toDate();
    const selectedCard = cards[0]; // You need to define how you select a card here.
    const transactionData = await api.transactions.get({
      limit: 999,
      filter: "card",
      filterBy: selectedCard.title,
      date: currentMonth,
      token: parsedUser.accessToken,
    });
    transactions = transactionData.results;
    total = transactionData.total;
  }

  return <Content transactions={transactions} cards={cards} total={total} />;
}
