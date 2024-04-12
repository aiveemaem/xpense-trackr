"use client";

import { useState, useEffect } from "react";
import {
  getTransactions,
  addTransactions,
  deleteTransaction,
} from "../../_services/transaction-service";
import { useUserAuth } from "../../_utils/auth-context";
import Transactions from "../../components/transactions.js";
import NewTransaction from "./new-transaction";

export default function TransactionPage() {
  const { user } = useUserAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const [transaction, setTransactions] = useState([]);
  const [openTransaction, setOpenTransaction] = useState(false); // 2

  const handleAddTransaction = async (txn) => {
    txn.date = new Date(txn.date);
    const id = await addTransactions(user.uid, txn);
    setTransactions([...transaction, { id: id, ...txn }]);
  };

  async function loadTransactions() {
    const fetchedTransactions = await getTransactions(user.uid);
    setTransactions(fetchedTransactions);
  }

  const handleDeleteTransaction = async (itemId) => {
    try {
      await deleteTransaction(user.uid, itemId);

      setTransactions(transaction.filter((txn) => txn.id !== itemId));
      console.log(itemId);
      alert("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction: ", error);
    }
  };

  const handleCloseTransaction = () => {
    setOpenTransaction(false);
  };

  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);

  return (
    <main className=" w-full flex justify-center border-l-2">
      <div className="flex-1 flex flex-col gap-4 p-2 md:gap-8 md:p-10 relative">
        <div className="flex justify-end ">
          {/* <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={handleSearch}
            className="border border-gray-300 px-4 py-2 rounded-md mr-4  md:w-2/3"
          /> */}
          <button
            className=" btn btn-primary"
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
        <Transactions
          transactions={transaction}
          onDelete={handleDeleteTransaction}
        />
      </div>
    </main>
  );
}
