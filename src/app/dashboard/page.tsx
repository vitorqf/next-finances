import { fetchCategories } from "@/actions/fetch-categories";
import api from "@/lib/api";
import { Card } from "@/models/Card";
import { cookies } from "next/headers";
import { Content } from "./content";

export default async function Dashboard() {
  const user = cookies().get("@app:user");
  if (!user) {
    return null;
  }
  const parsedUser = JSON.parse(user.value);

  const cards: Card[] = await api.cards.get(parsedUser.accessToken);
  const categories = await fetchCategories();

  return <Content cards={cards} categories={categories} />;
}
