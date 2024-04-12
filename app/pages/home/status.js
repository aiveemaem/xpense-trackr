"use client";
import { getTransactions } from "../../_services/transaction-service";
import { useUserAuth } from "../../_utils/auth-context";
import { useState, useEffect } from "react";

export default function Status() {
  const [transactions, setTransactions] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const { user } = useUserAuth();

  // Function to load transactions
  async function loadTransactions() {
    if (user) {
      try {
        const fetchedTransactions = await getTransactions(user.uid);
        setTransactions(fetchedTransactions);

        // Calculate total expenses
        const total = fetchedTransactions.reduce((sum, txn) => {
          // Parse txn.amount to a number
          const amount = parseFloat(txn.amount);
          // Ensure amount is a number before adding it to sum
          return isNaN(amount) ? sum : sum + amount;
        }, 0);
        setTotalExpenses(total);

        // Calculate the count of transactions
        setTransactionCount(fetchedTransactions.length);
      } catch (error) {
        console.error("Failed to load transactions:", error);
      }
    }
  }

  // Fetch transactions when user is available
  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);

  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow">
      <div className="stat text-center ">
        <div className="stat-title">Expenses</div>
        <div className="stat-value text-primary">
          ${totalExpenses.toFixed(2)}
        </div>
        {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
      </div>

      <div className="stat text-center s">
        <div className="stat-title">Transactions</div>
        <div className="stat-value text-secondary">{transactionCount}</div>
      </div>
    </div>
  );
}
