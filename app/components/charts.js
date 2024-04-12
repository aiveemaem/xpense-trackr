"use client";

import { useState, useEffect } from "react";
import { getTransactions } from "../_services/transaction-service";
import BarChart from "./barchart";
import LineChart from "./linechart";
import DonutChart from "./donutchart";
import { useUserAuth } from "../_utils/auth-context";

export default function Charts() {
  const { user } = useUserAuth();
  const [transactions, setTransactions] = useState([]);
  const [aggregatedData, setAggregatedData] = useState({});
  const [monthlyExpenses, setMonthlyExpenses] = useState({});

  const fetchTransactions = async () => {
    try {
      if (user && user.uid) {
        const fetchedTransactions = await getTransactions(user.uid);
        setTransactions(fetchedTransactions);
      } else {
        console.error("User not available");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const aggregateTransactions = (transactions) => {
    // Initialize an object to store the accumulated data per category
    const aggregatedData = {};

    transactions.forEach((txn) => {
      const { category, amount } = txn;
      // Convert amount to a number to ensure proper arithmetic
      const numericAmount = parseFloat(amount);

      if (!aggregatedData[category]) {
        aggregatedData[category] = 0;
      }
      // Accumulate the numeric amount for the category
      aggregatedData[category] += numericAmount;
    });

    return aggregatedData;
  };

  // Calculate monthly expenses from transactions
  const calculateMonthlyExpenses = (transactions) => {
    const monthlyExpenses = {};

    transactions.forEach((txn) => {
      const { date, amount } = txn;
      const numericAmount = parseFloat(amount);
      const txnDate = new Date(date);
      const month = txnDate.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      if (!monthlyExpenses[month]) {
        monthlyExpenses[month] = 0;
      }

      monthlyExpenses[month] += numericAmount;
    });
    console.log("Monthly: ", monthlyExpenses);
    return monthlyExpenses;
  };

  // useEffect to fetch transactions when user changes
  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  // useEffect to aggregate transactions when transactions change
  useEffect(() => {
    if (transactions.length > 0) {
      setAggregatedData(aggregateTransactions(transactions));
      setMonthlyExpenses(calculateMonthlyExpenses(transactions));
    }
  }, [transactions]);

  return (
    <main>
      <div className="rounded-lg shadow-md p-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Expenses (per category)</h2>
        </div>
        <div className="mt-4 pt-4">
          {/* Render the bar chart for aggregated data */}
          <DonutChart
            data={aggregatedData}
            categories={Object.keys(aggregatedData)}
          />
        </div>
      </div>

      <div className="rounded-lg shadow-md p-6 w-full mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Expenses (per month)</h2>
        </div>
        <div className="mt-4 pt-4">
          <LineChart
            monthlyData={monthlyExpenses}
            months={Object.keys(monthlyExpenses)}
          />
        </div>
      </div>
    </main>
  );
}
