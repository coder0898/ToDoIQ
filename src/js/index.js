import "../css/global.css";
import "../css/list.css";
import "../css/todoForm.css";
import "../css/menu.css";
import "../css/chart.css";

// import { setupForm } from "./form";
// import { setupListActions } from "./actions";
// import { DisplayList, TableDisplay } from "./list";
// import { CalculateCount } from "./dashboard";
// import { CreateTodo } from "./todo";

let TodoLists = JSON.parse(localStorage.getItem("todoList")) || [];
let todoIdCounter =
  TodoLists.length > 0 ? TodoLists[TodoLists.length - 1].id + 1 : 1;
let isEditing = false;
let editingId = null;

window.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupSidebarToggle();

  setupForm((isEditing, editingId) => {
    CreateTodo(TodoLists, () => todoIdCounter++, isEditing, editingId);
  });

  setupListActions(() => {
    DisplayList(TodoLists);
    TableDisplay(TodoLists);
    CalculateCount(TodoLists);
  });

  DisplayList(TodoLists);
  TableDisplay(TodoLists);
  CalculateCount(TodoLists);
});

// tab
export function setupTabs() {
  const tabButtons = document.querySelectorAll(".tab-container .tab-link");
  const tabContent = document.querySelectorAll(".container .tab-content");

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      TabToggle(tabContent, tabButtons, index);
    });
  });
}

export function TabToggle(tabContent, tabbtn, index) {
  tabContent.forEach((content) => content.classList.remove("content-active"));
  tabbtn.forEach((button) => button.classList.remove("active"));

  tabContent[index].classList.add("content-active");
  tabbtn[index].classList.add("active");
}

export function setupSidebarToggle() {
  const toggleButton = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".menu-container");
  toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}

// import { formatDateForInput, getFormatDate, ResetForm } from "./utils";
// form
export function setupForm(onCreateCallback) {
  const title = document.getElementById("todoTitle");
  const category = document.getElementById("selectCategory");
  const dueDate = document.getElementById("dueDateVal");
  const priority = document.getElementById("selectPriority");
  const completed = document.getElementById("completedCheck");
  const checkStatus = document.getElementById("checkStatus");
  const submitBtn = document.getElementById("submitTodo");

  completed.addEventListener("change", () => {
    checkStatus.innerText = completed.checked ? "Completed" : "Pending";
  });

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    onCreateCallback(isEditing, editingId);
    isEditing = false;
    editingId = null;
  });
}

export function setFormDataForEdit(todo) {
  document.getElementById("todoTitle").value = todo.title;
  document.getElementById("selectCategory").value = todo.category;
  document.getElementById("dueDateVal").value = formatDateForInput(
    todo.dueDate
  );
  document.getElementById("selectPriority").value = todo.todoPriority;
  document.getElementById("completedCheck").checked =
    todo.todoStatus === "Completed";
  document.getElementById("checkStatus").innerText = todo.todoStatus;

  isEditing = true;
  editingId = todo.id;
}

// action
export function setupListActions(refreshCallback, setFormDataForEdit) {
  document.addEventListener("click", (e) => {
    const target = e.target.closest(".delete-btn, .edit-btn");
    if (!target) return;

    const id = Number(e.target.dataset.id);

    if (e.target.matches(".delete-btn")) {
      let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
      todoList = todoList.filter((item) => item.id !== id);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      refreshCallback();
    }

    if (e.target.matches(".edit-btn")) {
      let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
      const todo = todoList.find((item) => item.id === id);
      if (todo) {
        setFormDataForEdit(todo); // callback to load form data
      }
    }
  });
}

// todo
// import { getFormatDate } from "./utils";

export function CreateTodo(
  TodoLists,
  getNewId,
  isEditing = false,
  editingId = null
) {
  const title = document.getElementById("todoTitle").value.trim();
  const category = document.getElementById("selectCategory").value.trim();
  const dueDate = document.getElementById("dueDateVal").value;
  const priority = document.getElementById("selectPriority").value;
  const isCompleted = document.getElementById("completedCheck").checked;
  const status = isCompleted ? "Completed" : "Pending";

  if (!title || !category || !dueDate || !priority) {
    return alert("Please enter valid data");
  }

  const formattedDueDate = getFormatDate(new Date(dueDate));
  const newTodo = {
    id: isEditing ? editingId : getNewId(),
    title,
    category,
    createdDate: getFormatDate(new Date()),
    dueDate: formattedDueDate,
    todoStatus: status,
    todoPriority: priority,
  };

  if (isEditing) {
    // Update the existing item
    const index = TodoLists.findIndex((item) => item.id === editingId);
    if (index !== -1) {
      TodoLists[index] = newTodo;
    }
  } else {
    TodoLists.push(newTodo);
  }

  localStorage.setItem("todoList", JSON.stringify(TodoLists));
  alert(isEditing ? "Todo Updated Successfully" : "Todo Added Successfully");
  ResetForm();
}

// list
// import { createElement, createHTML } from "./utils";

export function DisplayList(TodoLists) {
  const list = document.getElementById("todoItemList");
  list.innerHTML = "";

  if (TodoLists.length === 0) {
    list.innerHTML = `<div class="no-records"><p>No records.</p></div>`;
    return;
  }

  TodoLists.forEach(
    ({
      id,
      title,
      category,
      createdDate,
      dueDate,
      todoStatus,
      todoPriority,
    }) => {
      const card = createElement("div", "list-card");

      const header = createElement("div", "todo-header");
      header.append(
        createElement("h4", "todo-title", title),
        createElement("span", "todo-category", category)
      );

      const dates = createElement("div", "todo-dates");
      dates.append(
        createHTML("p", `<strong>Created On:</strong> ${createdDate}`),
        createHTML("p", `<strong>Due Date:</strong> ${dueDate}`)
      );

      const statusGroup = createElement("div", "status-group");
      const statusSpan = createElement("span", "todo-status", todoStatus);
      if (statusSpan.innerText == "Completed") {
        statusSpan.style.color = "var(--status-completed)";
      }
      const prioritySpan = createElement("span", "todo-priority", todoPriority);
      statusGroup.append(statusSpan, prioritySpan);

      const actions = createElement("div", "todo-actions");
      actions.innerHTML = `<button class="edit-btn" data-id="${id}">Edit</button><button class="delete-btn" data-id="${id}">Delete</button>`;

      card.append(header, dates, statusGroup, actions);
      list.append(card);
    }
  );
}

export function TableDisplay(todoList) {
  const tableBody = document.querySelector(".todo-content tbody");
  tableBody.innerHTML = "";

  if (todoList.length === 0) {
    tableBody.innerHTML = `<tr class="no-records"><td>No records.</td></tr>`;
    return;
  }

  todoList.forEach(
    ({ id, title, category, dueDate, todoStatus, todoPriority }) => {
      const tableRow = createElement("tr");
      const IdData = createElement("td", "", id);
      const TitleData = createElement("td", "", title);
      const CategoryData = createElement("td", "", category);
      const PriorityData = createElement("td", "", todoPriority);
      const DueDateData = createElement("td", "", dueDate);
      const CompletedData = createElement("td", "", todoStatus);
      const TodoAction = createElement("td", "todo-actions");
      const DeleteButton = createElement("button", "delete-btn", "Delete");
      DeleteButton.setAttribute("data-id", id);
      TodoAction.append(DeleteButton);

      tableRow.append(
        IdData,
        TitleData,
        CategoryData,
        PriorityData,
        DueDateData,
        CompletedData,
        TodoAction
      );
      tableBody.appendChild(tableRow);
    }
  );
}

// dashboard
import Chart from "chart.js/auto";

let pieChartInstance = null,
  barChartInstance = null;
let totalCount = 0,
  pendingCount = 0,
  completedCount = 0;

export function CalculateCount(todoList) {
  totalCount = todoList.length;
  pendingCount = todoList.filter(
    (todo) => todo.todoStatus === "Pending"
  ).length;
  completedCount = todoList.filter(
    (todo) => todo.todoStatus === "Completed"
  ).length;

  document.getElementById("totalCount").innerText = totalCount;
  document.getElementById("completedCount").innerText = completedCount;
  document.getElementById("pendingCount").innerText = pendingCount;

  updateCharts(totalCount, pendingCount, completedCount);
}

function updateCharts(total, pending, completed) {
  if (pieChartInstance) pieChartInstance.destroy();
  if (barChartInstance) barChartInstance.destroy();

  pieChartInstance = new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: ["Total Todo", "Pending Todo", "Completed Todo"],
      datasets: [
        {
          data: [total, pending, completed],
          backgroundColor: ["blue", "red", "green"],
        },
      ],
    },
  });

  barChartInstance = new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: ["Pending Todo", "Completed Todo"],
      datasets: [
        { data: [pending, completed], backgroundColor: ["red", "green"] },
      ],
    },
  });
}
// util
export const getFormatDate = (date) => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

export const createElement = (tag, className = "", text = "") => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.innerText = text;
  return el;
};

export const createHTML = (tag, html) => {
  const el = document.createElement(tag);
  el.innerHTML = html;
  return el;
};

export const ResetForm = () => {
  document.getElementById("todoTitle").value = "";
  document.getElementById("selectCategory").value = "";
  document.getElementById("dueDateVal").value = "";
  document.getElementById("selectPriority").value = "";
  document.getElementById("completedCheck").checked = false;
  document.getElementById("todoTitle").focus();
};

export function formatDateForInput(dateString) {
  const [dd, mm, yyyy] = dateString.split("-");
  return `${yyyy}-${mm}-${dd}`;
}
