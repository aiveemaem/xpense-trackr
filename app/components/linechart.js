"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import Chart.js library
import Link from "next/link";

export default function LineChart({ monthlyData, months }) {
  const monthlyChartRef = useRef(null);
  const monthlyChartInstance = useRef(null);

  useEffect(() => {
    if (monthlyData && monthlyChartRef.current) {
      const labels = months;
      const values = Object.values(monthlyData);
      const ctx = monthlyChartRef.current.getContext("2d");

      // Destroy the existing chart instance if it exists
      if (monthlyChartInstance.current !== null) {
        monthlyChartInstance.current.destroy();
      }

      // Create a new chart instance
      monthlyChartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Monthly Expenses",
              data: values,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              hoverBackgroundColor: "rgba(255, 99, 132, 0.8)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              fill: true,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return `$${parseFloat(value).toFixed(2)}`;
                },
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  const amount = context.dataset.data[context.dataIndex];
                  return `$${parseFloat(amount).toFixed(2)}`;
                },
              },
            },
          },
        },
      });
    } else {
      // If there is no data, destroy the existing chart instance if it exists
      if (monthlyChartInstance.current) {
        monthlyChartInstance.current.destroy();
        monthlyChartInstance.current = null;
      }
    }
  }, [monthlyData, months]);

  // Conditionally render the chart canvas or a "No data available" message
  return (
    <div className="mt-4">
      {monthlyData && Object.keys(monthlyData).length > 0 ? (
        <canvas ref={monthlyChartRef} />
      ) : (
        <p>
          No data available. Go to{" "}
          <Link
            href="/pages/transactions"
            className=" text-primary hover:underline"
          >
            Transactions
          </Link>
        </p>
      )}
    </div>
  );
}
