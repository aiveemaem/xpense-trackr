"use client";
import transData from "../trans-list.json";
import BarChart from "./barchart";

export default function Charts() {
  let transactions = transData.map((txn) => ({
    ...txn,
    date: new Date(txn.date),
  }));

  let aggregatedData = transactions.reduce((acc, txn) => {
    if (!acc[txn.category]) {
      acc[txn.category] = 0;
    }
    acc[txn.category] += txn.amount;
    return acc;
  }, {});

  let totalAmount = transactions.reduce((acc, txn) => acc + txn.amount, 0);
  return (
    <main>
      <div className="bg-white border border-gray-100 rounded-lg shadow-md p-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">All Transactions</h2>
          <span className="text-gray-600 font-semibold">
            Total: ${totalAmount.toFixed(2)}
          </span>
        </div>
        <div className=" mt-4 pt-4">
          <div className="chart bar-chart">
            {/* Render bar chart component here */}

            <BarChart
              data={aggregatedData}
              categories={Object.keys(aggregatedData)}
            />
            <div className="chart-data">
              {/* Iterate over aggregated data and render bar for each category */}

              {Object.entries(aggregatedData).map(([category, amount]) => (
                <div className="flex items-center justify-between">
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
