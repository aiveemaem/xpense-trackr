"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import Chart.js library

export default function DonutChart({ data, categories }) {
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
    }
  }, [data, categories]);

  return <canvas ref={chartRef} width="400" height="400" />;
}
