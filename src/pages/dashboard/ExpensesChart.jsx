import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTranslation } from "react-i18next";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const ExpensesChart = ({ data = {} }) => {
  const { t } = useTranslation();
  const weeklyExpenses = data.weekly_expenses || [];

  // Prepare chart data
  const chartData = useMemo(() => {
    const labels = weeklyExpenses.map((e) =>
      new Date(e.date).toLocaleDateString("en-US", { weekday: "short" })
    );

    const dataValues = weeklyExpenses.map((e) => e.amount);

    return {
      labels,
      datasets: [
        {
          label: t("Money Spent"),
          data: dataValues,
          borderColor: "#8b5cf6",
          backgroundColor: "rgba(139, 92, 246, 0.1)",
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#8b5cf6",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  }, [weeklyExpenses, t]);

  // Chart options
  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `${context.raw} CHF`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax:
            weeklyExpenses.length > 0
              ? Math.max(...weeklyExpenses.map((e) => e.amount)) + 1000
              : 1000,
          ticks: { callback: (value) => `${value} CHF` },
          grid: { color: "#f3f4f6" },
        },
        x: { grid: { display: false } },
      },
    }),
    [weeklyExpenses]
  );

  return (
    <div className="bg-white rounded-lg px-4 py-2 shadow-md border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-gray-800">{t("Weekly Expenses")}</h2>
      </div>

      {/* Chart */}
      <div className="h-64">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
        <span className="text-sm text-gray-600">{t("Money Spent")}</span>
      </div>
    </div>
  );
};

export default ExpensesChart;
// import React, { useMemo } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { useTranslation } from "react-i18next";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend
// );

// const ExpensesChart = ({ data }) => {
//   const { t } = useTranslation();

//   const weeklyExpenses = data?.weekly_expenses;
//   // Convert date to day abbreviation
//   const chartData = useMemo(() => {
//     const labels = weeklyExpenses.map((e) => {
//       const date = new Date(e.date);
//       return date.toLocaleDateString("en-US", { weekday: "short" }); // Sun, Mon, etc.
//     });

//     const dataValues = weeklyExpenses.map((e) => e.amount);

//     return {
//       labels,
//       datasets: [
//         {
//           label: "Money Spent",
//           data: dataValues,
//           borderColor: "#8b5cf6",
//           backgroundColor: "rgba(139, 92, 246, 0.1)",
//           borderWidth: 2.5,
//           fill: true,
//           tension: 0.4,
//           pointBackgroundColor: "#8b5cf6",
//           pointBorderColor: "#fff",
//           pointBorderWidth: 2,
//           pointRadius: 4,
//           pointHoverRadius: 6,
//         },
//       ],
//     };
//   }, [weeklyExpenses]);

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         callbacks: {
//           label: (context) => `${context.raw} CHF`,
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         // optional: auto scale max
//         suggestedMax: Math.max(...weeklyExpenses.map((e) => e.amount)) + 1000,
//         ticks: {
//           callback: (value) => `${value} CHF`,
//         },
//         grid: { color: "#f3f4f6" },
//       },
//       x: {
//         grid: { display: false },
//       },
//     },
//   };

//   return (
//     <div className="bg-white rounded-lg px-4 py-2 shadow-md border border-gray-100">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-3">
//         <h2 className="font-semibold text-gray-800">{t("Weekly Expenses")}</h2>
//       </div>

//       {/* Chart */}
//       <div className="h-64">
//         <Line data={chartData} options={chartOptions} />
//       </div>

//       {/* Legend */}
//       <div className="flex items-center justify-center gap-2 mt-4">
//         <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
//         <span className="text-sm text-gray-600">{t("Money Spent")}</span>
//       </div>
//     </div>
//   );
// };

// export default ExpensesChart;
