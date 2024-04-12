"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import Chart.js library

export default function LineChart({ monthlyData, months }) {
  const monthlyChartRef = useRef(null);
  const monthlyChartInstance = useRef(null);

  useEffect(() => {
    if (monthlyData) {
      const labels = months;
      const values = Object.values(monthlyData);
      const ctx = monthlyChartRef.current.getContext("2d");

      if (monthlyChartInstance.current !== null) {
        monthlyChartInstance.current.destroy(); // Destroy the previous chart instance if it exists
      }

      monthlyChartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Monthly Expenses",
              data: values,
              backgroundColor: "rgba(255, 99, 132, 0.5)", // Different color for monthly chart
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
    }
  }, [monthlyData, months]);

  return <canvas ref={monthlyChartRef} className="mt-4" />;
}
