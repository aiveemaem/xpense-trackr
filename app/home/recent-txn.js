"use client";
import transData from "../trans-list.json";
import Link from "next/link";

export default function RecentTxn() {
  let transactions = transData.map((txn) => ({
    ...txn,
    date: new Date(txn.date),
  }));

  transactions.sort((a, b) => b.date - a.date);

  let recentTransactions = transactions.slice(0, 5);

  return (
    <main>
      <div className="bg-white border border-gray-100 rounded-lg shadow-md p-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <Link href="./transactions" className="text-blue-500 hover:underline">
            View All
          </Link>
        </div>
        <div className="border-t border-gray-200 mt-4 pt-4">
          {/* Column names */}
          <div className="flex items-center justify-between py-2 font-semibold text-gray-600">
            <span className="w-full sm:w-1/4">Date</span>
            <span className="w-full sm:w-1/4">Category</span>
            <span className="w-full sm:w-1/4">Description</span>
            <span className="w-full sm:w-1/4 text-right">Amount</span>
          </div>
          {/* Transaction items */}
          {recentTransactions.map((txn, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2"
            >
              <span className="w-full sm:w-1/4">{txn.date.toDateString()}</span>
              <span className="w-full sm:w-1/4">{txn.category}</span>
              <span className="w-full sm:w-1/4">{txn.description}</span>
              <span className="w-full sm:w-1/4 text-right">${txn.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
