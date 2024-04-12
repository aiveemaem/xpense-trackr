"use client";

import { useState } from "react";

export default function Transactions({ transactions, onDelete }) {
  const [sortBy, setSortBy] = useState("date");

  const sortedTransactions = transactions?.sort((a, b) => {
    if (sortBy === "date") {
      return b.date - a.date;
    } else if (sortBy == "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  return (
    <main>
      <div className="  rounded-lg shadow-md p-6 w-full">
        <div className="flex items-center justify-between mb-2 border-b-2 pt-2 pb-4">
          <h2 className="text-2xl font-semibold ">All Transactions</h2>
          <div className="flex items-center space-x-4">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Date</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-xl">
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((txn) => (
                <tr key={txn.id} className="hover text-base">
                  <td>{txn.date.toLocaleDateString()}</td>
                  <td>{txn.category}</td>
                  <td>{txn.description}</td>
                  <td>${parseFloat(txn.amount).toFixed(2)}</td>
                  <td>
                    <button onClick={() => onDelete(txn.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
