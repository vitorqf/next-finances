"use client";

import { Transaction } from "@/models/Transaction";
import { formatTime } from "@/utils";
import { useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";

type MyDatum = {
  date: string;
  average: number;
};

export function BalanceChart({
  transactions,
}: {
  transactions: Transaction[];
}) {
  // Aggregate transaction amounts by date
  const aggregatedData = useMemo(() => {
    const dataMap = new Map<string, { total: number; count: number }>(); // Map to store aggregated data

    // Iterate through transactions and aggregate amounts by date
    transactions.forEach((transaction) => {
      const date = formatTime(transaction.date);
      const amount = transaction.amount;

      // Update the total amount and count for the date
      if (dataMap.has(date)) {
        const entry = dataMap.get(date)!;
        entry.total += amount;
        entry.count += 1;
      } else {
        dataMap.set(date, { total: amount, count: 1 });
      }
    });

    // Compute the average for each date
    return Array.from(dataMap).map(([date, { total, count }]) => ({
      date,
      average: total / count,
    }));
  }, [transactions]);

  const data = [
    {
      label: "Average",
      data: aggregatedData,
    },
  ];

  const primaryAxis = useMemo(
    (): AxisOptions<MyDatum> => ({
      getValue: (datum) => datum.date,
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<MyDatum>[] => [
      {
        getValue: (datum) => datum.average,
        elementType: "bar",
      },
    ],
    []
  );

  return (
    <Chart
      options={{
        data,
        primaryAxis,
        secondaryAxes,
        dark: true,
      }}
    />
  );
}
