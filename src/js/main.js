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
import { TableDisplay } from "./table.js";

let TodoLists = JSON.parse(localStorage.getItem("todoList")) || [];
let todoIdCounter =
  TodoLists.length > 0 ? TodoLists[TodoLists.length - 1].id + 1 : 1;
let currentEditId = null;

window.addEventListener("DOMContentLoaded", () => {
  CalculateCount(TodoLists);
  setupTabs();
  setupSidebarToggle();

  setupForm(
    () => {
      // Add Mode
      CreateTodo(TodoLists, () => todoIdCounter++, false, null);
    },
    () => {
      // Edit Mode
      CreateTodo(TodoLists, () => todoIdCounter++, true, currentEditId);
      currentEditId = null;
      document.getElementById("todoModal").style.display = "none";
    }
  );

  setupListActions((todo) => {
    currentEditId = todo.id;
    setFormDataForEdit(todo);
  });

  DisplayList(TodoLists);
  TableDisplay(TodoLists);
});
