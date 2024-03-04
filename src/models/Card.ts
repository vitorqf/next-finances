import { Transaction } from "./Transaction";
import { User } from "./User";

export interface Card {
  id: string;
  flag: string;
  type: string;
  title: string;
  created_at: string;
  updated_at: string;
  user: User;
  last_digits: number;
  transactions: Transaction[];
}
