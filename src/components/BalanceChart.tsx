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
import moment from "moment";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

export function BalanceChart({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const transactionsPerDay = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        const dateKey = moment(transaction.date).format("YYYY-MM-DD");

        acc[dateKey] = (acc[dateKey] || 0) + transaction.amount / 100;

        return acc;
      },
      {} as Record<string, number>,
    );
  }, [transactions]);

  const labels = useMemo(() => {
    const currentDate = moment();
    const daysInMonth = Array.from(
      { length: currentDate.daysInMonth() },
      (_, index) =>
        currentDate
          .date(index + 1)
          .toISOString()
          .split("T")[0],
    );
    return daysInMonth;
  }, []);

  const chartData = useMemo(() => {
    return {
      labels: labels.map((label) => label.split("-")[2]),
      datasets: [
        {
          label: "Saldo",
          data: labels.map((label) => transactionsPerDay[label] || 0),
          borderColor: "#0284C7",
          tension: 0.1,
        },
      ],
    };
  }, [transactionsPerDay, labels]);

  return <Line data={chartData} options={options} />;
}
