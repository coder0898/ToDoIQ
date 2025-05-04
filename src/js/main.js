import "../css/global.css";
import "../css/list.css";
import "../css/todoForm.css";
import "../css/menu.css";
import "../css/chart.css";
import "../css/modal.css";

import { setupTabs, setupSidebarToggle } from "./tabs.js";
import { CreateTodo, setFormDataForEdit, setupForm } from "./form.js";
import { DisplayList, setupListActions } from "./list.js";
import { CalculateCount } from "./dash.js";
import { RenderPagination, TableDisplay } from "./table.js";

let TodoLists = JSON.parse(localStorage.getItem("todoList")) || [];
let todoIdCounter =
  TodoLists.length > 0 ? TodoLists[TodoLists.length - 1].id + 1 : 1;
let currentEditId = null;
const entriesPerPage = 5;
let currentPage = 1;

window.addEventListener("DOMContentLoaded", () => {
  CalculateCount(TodoLists);
  setupTabs();
  setupSidebarToggle();

  setupForm(
    () => {
      // Add Mode
      CreateTodo(
        TodoLists,
        () => todoIdCounter++,
        false,
        null,
        currentPage,
        entriesPerPage
      );
    },
    () => {
      // Edit Mode
      CreateTodo(
        TodoLists,
        () => todoIdCounter++,
        true,
        currentEditId,
        currentPage,
        entriesPerPage
      );
      currentEditId = null;
      document.getElementById("todoModal").style.display = "none";
    }
  );

  setupListActions((todo) => {
    currentEditId = todo.id;
    setFormDataForEdit(todo);
  });

  DisplayList(TodoLists);
  TableDisplay(TodoLists, currentPage, entriesPerPage);
  RenderPagination(TodoLists, currentPage, entriesPerPage);
});

const SerchInput = document.getElementById("searchTodo");

SerchInput.addEventListener("input", () => {
  const searchText = SerchInput.value.toLowerCase();
  const filteredTodos = TodoLists.filter(
    (todo) =>
      todo.title.toLowerCase().includes(searchText) ||
      todo.category.toLowerCase().includes(searchText) ||
      todo.todoPriority.toLowerCase().includes(searchText) ||
      todo.todoStatus.toLowerCase().includes(searchText)
  );
  currentPage = 1; // Reset to first page when filtering
  TableDisplay(filteredTodos, currentPage, entriesPerPage);
  RenderPagination(filteredTodos, currentPage, entriesPerPage);
});
