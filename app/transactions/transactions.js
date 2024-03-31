"use client";

import { useState } from "react";

export default function Transactions({ transactions }) {
  const totalAmount = transactions.reduce(
    (total, txn) => total + parseFloat(txn.amount),
    0
  );
  return (
    <main>
      <div className=" ">
        <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">All Transactions</h2>
            <span className="text-gray-600 font-semibold">
              Total: ${totalAmount.toFixed(2)}
            </span>
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
            {transactions.map((txn, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2"
              >
                <span className="w-full sm:w-1/4">
                  {txn.date.toDateString()}
                </span>
                <span className="w-full sm:w-1/4">{txn.category}</span>
                <span className="w-full sm:w-1/4">{txn.description}</span>
                <span className="w-full sm:w-1/4 text-right">
                  ${txn.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
