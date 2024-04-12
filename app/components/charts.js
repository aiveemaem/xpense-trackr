"use client";

import { useState, useEffect } from "react";
import { getTransactions } from "../_services/transaction-service";
import transData from "../trans-list.json";
import BarChart from "./barchart";
import { useUserAuth } from "../_utils/auth-context";

export default function Charts() {
  const { user } = useUserAuth();
  const [transactions, setTransactions] = useState([]);
  const [aggregatedData, setAggregatedData] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

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

    // Iterate through each transaction
    transactions.forEach((txn) => {
      const { category, amount } = txn;

      // Convert amount to a number to ensure proper arithmetic
      const numericAmount = parseFloat(amount);

      // If the category does not exist in the aggregated data object, initialize it to 0
      if (!aggregatedData[category]) {
        aggregatedData[category] = 0;
      }

      // Accumulate the numeric amount for the category
      aggregatedData[category] += numericAmount;
    });

    return aggregatedData;
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
      const aggregated = aggregateTransactions(transactions);
      setAggregatedData(aggregated);
    }
  }, [transactions]);

  return (
    <main>
      <div className="bg-white border border-gray-100 rounded-lg shadow-md p-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Total Expenses</h2>
        </div>
        <div className="mt-4 pt-4">
          <div className="chart bar-chart">
            {/* Render bar chart component here */}
            <BarChart
              data={aggregatedData}
              categories={Object.keys(aggregatedData)}
            />

            {/* Iterate over aggregated data and render bars for each category */}
            <div className="chart-data">
              {Object.entries(aggregatedData).map(([category]) => (
                <div
                  className="flex items-center justify-between"
                  key={category}
                >
                  <div className="w-3/4">
                    <div className="bar">
                      <div
                        className="bar-fill"
                        style={{ width: `${(totalAmount / 100) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
