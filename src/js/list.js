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
      const card = createElement("div", "list-card card mb-3 shadow-sm");

      const cardBody = createElement("div", "card-body");
      const header = createElement(
        "div",
        " d-flex justify-content-between align-items-start mb-2 flex-wrap"
      );
      header.append(
        createElement("h4", "card-title mb-1", title),
        createElement("span", "badge bg-primary todo-category", category)
      );

      const dates = createElement("div", "todo-dates");
      dates.append(
        createHTML("p", `<strong>Created On:</strong> ${createdDate}`),
        createHTML("p", `<strong>Due Date:</strong> ${dueDate}`)
      );

      const statusGroup = createElement(
        "div",
        "status-group flex-wrap sm:flex-column"
      );
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

      cardBody.append(header, dates, statusGroup, actions);
      card.append(cardBody);
      list.append(card);
    }
  );
}

const modal = document.getElementById("todoModal");
// const openModalBtn = document.querySelector(".edit-btn");
const closeBtn = document.querySelector(".close-btn");
const EditTodo = document.getElementById("editTodo");

export function setupListActions(setFormDataForEdit) {
  document.addEventListener("click", (e) => {
    const target = e.target.closest(".delete-btn, .edit-btn");
    if (!target) return;

    const id = Number(target.dataset.id);
    let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

    if (target.classList.contains("delete-btn")) {
      todoList = todoList.filter((item) => item.id !== id);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      DisplayList(todoList);
      TableDisplay(todoList);
      CalculateCount(todoList);
    }

    if (target.classList.contains("edit-btn")) {
      const todo = todoList.find((item) => item.id === id);
      if (todo) {
        setFormDataForEdit(todo); // send to main.js
      }
    }
  });
}

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close on outside click
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// list filter
const FilterButtons = document.querySelectorAll(".filter-btn button");

FilterButtons.forEach((button) => {
  let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  button.addEventListener("click", (e) => {
    const target = e.target.closest(".btn-primary, .btn-danger, .btn-success");
    if (!target) {
      return "not there";
    }
    if (target.classList.contains("btn-danger")) {
      let newTodoList = todoList.filter((todo) => todo.todoStatus == "Pending");
      // console.log(newTodoList)
      DisplayList(newTodoList);
    } else if (target.classList.contains("btn-success")) {
      let newTodoList = todoList.filter(
        (todo) => todo.todoStatus == "Completed"
      );
      // console.log(newTodoList)
      DisplayList(newTodoList);
    } else {
      DisplayList(todoList);
    }
  });
});
