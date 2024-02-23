"use client";

import { Transaction } from "@/models/Transaction";
import {
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export function BalanceChart({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const transactionsPerDay = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      if (acc[transaction.date]) {
        acc[transaction.date] += transaction.amount / 100;
      } else {
        acc[transaction.date] = transaction.amount / 100;
      }

      return acc;
    }, {} as Record<string, number>);
  }, [transactions]);

  const labels = useMemo(() => {
    const currentDate = new Date();
    const daysInMonth = getDaysInMonth(
      currentDate.getMonth(),
      currentDate.getFullYear()
    );

    return daysInMonth.map((date) => date.toISOString().split("T")[0]);
  }, []);

  const chartData = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: "Saldo",
          data: labels.map((label) => transactionsPerDay[label] || 0), // Map transaction amount to corresponding date
          fill: false,
          borderColor: "#0284C7",
          tension: 0,
        },
      ],
    };
  }, [transactionsPerDay, labels]);

  return <Line data={chartData} options={options} />;
}
