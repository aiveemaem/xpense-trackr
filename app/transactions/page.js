"use client";

import { useState } from "react";
import Heading from "../heading";
import NavBar from "../navbar";
import Transactions from "./transactions";
import NewTransaction from "./new-transaction";
import TransData from "../trans-list.json";

export default function Page() {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [transaction, setTransactions] = useState(
    TransData.map((txn) => ({ ...txn, date: new Date(txn.date) })) // 1
  );

  const [openTransaction, setOpenTransaction] = useState(false); // 2
  const handleAddTransaction = (txn) => {
    setTransactions([...transaction, txn]);
  };

  const handleCloseTransaction = () => {
    setOpenTransaction(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <main className="container mx-auto px-2 border bg-blue-50 relative">
      <Heading />
      <div className="flex-1 flex min-h-[calc(100vh_-_theme(spacing.14))] w-full overflow-hidden">
        <NavBar />
        <div className="flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-10 relative">
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={handleSearch}
              className="border border-gray-300 px-4 py-2 rounded-md mr-4 w-full sm:w-2/3"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
              onClick={() => setOpenTransaction(true)}
            >
              Add Transaction
            </button>
          </div>
          {openTransaction && (
            <NewTransaction
              onAddTransaction={handleAddTransaction}
              onCloseTransaction={handleCloseTransaction}
            />
          )}
          <Transactions transactions={transaction} />
        </div>
      </div>
    </main>
  );
}
