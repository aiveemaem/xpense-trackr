"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import Chart.js library

export default function BarChart({ data, categories }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (data) {
      const labels = categories;
      const values = Object.values(data);

      const ctx = chartRef.current.getContext("2d");

      if (chartInstance.current !== null) {
        chartInstance.current.destroy(); // Destroy the previous chart instance if it exists
      }

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Categories",
              data: values,
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
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
            // Configure the tooltip to display dollar signs and formatted numbers
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
  }, [data, categories]);

  return <canvas ref={chartRef} />;
}
