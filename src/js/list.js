import { CalculateCount } from "./dash.js";
import { TableDisplay } from "./table.js";
import { createElement, createHTML } from "./util.js";

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
      if (todoPriority === "Medium") prioritySpan.classList.add("medium");
      if (todoPriority === "High") prioritySpan.classList.add("high");
      statusGroup.append(statusSpan, prioritySpan);

      const actions = createElement("div", "todo-actions");
      actions.innerHTML = `
      <button class="edit-btn" data-id="${id}">Edit</button>
      <button class="delete-btn" data-id="${id}">Delete</button>
    `;

      card.append(header, dates, statusGroup, actions);
      list.append(card);
    }
  );
}

export function setupListActions(setFormDataForEdit) {
  document.addEventListener("click", (e) => {
    const target = e.target.closest(".delete-btn, .edit-btn");
    if (!target) return;

    const id = Number(e.target.dataset.id);

    if (e.target.matches(".delete-btn")) {
      let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
      todoList = todoList.filter((item) => item.id !== id);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      DisplayList(todoList);
      TableDisplay(todoList);
      CalculateCount(todoList);
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
