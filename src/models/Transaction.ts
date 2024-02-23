import { Card } from "./Card";
import { Category } from "./Category";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  created_at: string;
  updated_at: string;
  category: Category;
  card: Card;
}
