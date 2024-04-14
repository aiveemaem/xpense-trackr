"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import Chart.js library
import Link from "next/link";

export default function DonutChart({ data, categories }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (data && chartRef.current) {
      // If there is data, proceed with chart creation
      const labels = categories;
      const values = Object.values(data);
      const ctx = chartRef.current.getContext("2d");

      // Destroy the existing chart instance if it exists
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }

      // Create a new chart instance
      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Categories",
              data: values,
              backgroundColor: [
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 99, 132, 0.7)",
                "rgba(255, 205, 86, 0.7)",
                "rgba(75, 192, 192, 0.7)",
                "rgba(153, 102, 255, 0.7)",
                "rgba(255, 159, 64, 0.7)",
              ], // Customize colors for each slice
              borderColor: "#fff",
              borderWidth: 1,
            },
          ],
        },
        options: {
          maintainAspectRatio: false, // Disable maintaining aspect ratio
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
      // If no data or chartRef is null, destroy the chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    }
  }, [data, categories]);

  // Conditionally render the chart canvas or a "No data available" message
  return (
    <div>
      {data && Object.keys(data).length > 0 ? (
        <canvas ref={chartRef} width="400" height="400" />
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
