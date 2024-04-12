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
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";

export default function TransactionPage() {
  const { user } = useUserAuth();
  const [transaction, setTransactions] = useState([]);
  const [openTransaction, setOpenTransaction] = useState(false); // 2

  const handleAddTransaction = async (txn) => {
    txn.date = new Date(txn.date);
    const id = await addTransactions(user.uid, txn);
    setTransactions([...transaction, { id: id, ...txn }]);
  };

  const handleDeleteTransaction = async (itemId, event) => {
    event.stopPropagation();
    try {
      await deleteTransaction(user.uid, itemId);
      setTransactions(transaction.filter((txn) => txn.id !== itemId));
      console.log("Item id: ", itemId);
      alert("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction: ", error);
    }
  };

  async function loadTransactions() {
    const fetchedTransactions = await getTransactions(user.uid);
    setTransactions(fetchedTransactions);
  }

  const handleCloseTransaction = () => {
    setOpenTransaction(false);
  };

  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen items-center">
      <NavBar />
      <main className="flex-1 w-full py-4 px-4 md:px-8 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center">
            <h2 className="text-xl font-semibold mt-4">TRANSACTIONS</h2>

            <div className="fixed bottom-32 right-8 md:bottom-24 md:right-10 lg:bottom-24 lg:right-10">
              <button
                className="btn btn-circle btn-primary  w-16 h-16 md:w-20 md:h-20"
                onClick={() => setOpenTransaction(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
              </button>
            </div>
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
      <Footer className="mt-auto" />
    </div>
  );
}
