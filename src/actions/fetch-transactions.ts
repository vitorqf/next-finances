"use server";

import api from "@/lib/api";
import { Transaction } from "@/models/Transaction";

export async function fetchTransactions(
  card: string,
  currentMonth: Date,
  token: string,
) {
  try {
    const transactionData = await api.transactions.get({
      limit: 999,
      filter: "card",
      filterBy: card,
      date: currentMonth,
      token: token,
    });
    return {
      results: transactionData.results as Transaction[],
      total: transactionData.total as number,
    };
  } catch (error) {
    console.error(error);
  }
}
