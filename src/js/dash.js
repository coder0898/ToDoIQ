import Chart from "chart.js/auto";

// count
const TotalCount = document.getElementById("totalCount");
const CompletedCount = document.getElementById("completedCount");
const PendingCount = document.getElementById("pendingCount");

// chart
const PieChart = document.getElementById("pieChart");
const BarChart = document.getElementById("barChart");

let totalCount = 0,
  pendingCount = 0,
  completedCount = 0;

let pieChartInstance = null,
  barChartInstance = null;

export function CalculateCount(todoList) {
  totalCount = todoList.length;
  TotalCount.innerText = totalCount;
  pendingCount = todoList.filter(
    (todo) => todo.todoStatus === "Pending"
  ).length;
  PendingCount.innerText = pendingCount;
  completedCount = todoList.filter(
    (todo) => todo.todoStatus === "Completed"
  ).length;
  CompletedCount.innerText = completedCount;

  MainCart(totalCount, pendingCount, completedCount);
}

function MainCart(total, pending, completed) {
  if (pieChartInstance && barChartInstance) {
    pieChartInstance.destroy();
    barChartInstance.destroy();
  }
  pieChartInstance = new Chart(PieChart, {
    type: "pie",
    data: {
      labels: ["Total Todo", "Pending Todo", "Completed Todo"],
      datasets: [
        {
          label: "Count",
          data: [total, pending, completed],
          backgroundColor: ["blue", "Red", "green"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });

  barChartInstance = new Chart(BarChart, {
    type: "bar",
    data: {
      labels: ["Pending Todo", "Completed Todo"],
      datasets: [
        {
          label: "Count",
          data: [pending, completed],
          backgroundColor: ["Red", "Green"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
}
