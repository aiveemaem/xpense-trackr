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
      <div className=" p-6 w-full">
        <div className="flex items-center justify-between mb-2 pt-2 pb-4">
          <div className="flex items-center space-x-4 ml-auto">
            <label
              htmlFor="sort"
              className="mr-2 text-md font-medium text-gray-700 md:mr-2"
            >
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-300 md:w-40"
            >
              <option value="date">Date</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
        <div className="w-full overflow-x-auto rounded-lg shadow-lg">
          <table className="table w-full border-collapse border border-gray-100 rounded-lg">
            <thead>
              <tr className="border-b border-gray-300 text-lg">
                <th>Date</th>
                <th>Category</th>
                <th className="hidden md:block">Description</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((txn) => (
                <tr key={txn.id} className="hover text-lg ">
                  <td>{txn.date.toLocaleDateString()}</td>
                  <td>{txn.category}</td>
                  <td className=" hidden md:block">{txn.description}</td>
                  <td>${parseFloat(txn.amount).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={(e) => onDelete(txn.id, e)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
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
