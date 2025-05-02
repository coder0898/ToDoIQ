import "../css/global.css";
import "../css/list.css";
import "../css/todoForm.css";
import "../css/menu.css";
import "../css/chart.css";

import { setupTabs, setupSidebarToggle } from "./tabs.js";
import { CreateTodo, setFormDataForEdit, setupForm } from "./form.js";
import { DisplayList, setupListActions } from "./list.js";
import { CalculateCount } from "./dash.js";
import { TableDisplay } from "./table.js";

let TodoLists = JSON.parse(localStorage.getItem("todoList")) || [];
let todoIdCounter =
  TodoLists.length > 0 ? TodoLists[TodoLists.length - 1].id + 1 : 1;

// window.addEventListener("DOMContentLoaded", () => {
//   CalculateCount(TodoLists);
//   setupTabs();
//   setupSidebarToggle();
//   setupForm((isEditing, editingId) => {
//     CreateTodo(TodoLists, () => todoIdCounter++, isEditing, editingId);
//   });
//   setupListActions(() => {
//     DisplayList(TodoLists), TableDisplay(TodoLists);
//     CalculateCount(TodoLists);
//   }, setFormDataForEdit);

//   DisplayList(TodoLists);
//   TableDisplay(TodoLists);
//   CalculateCount(TodoLists);
// });

window.addEventListener("DOMContentLoaded", () => {
  CalculateCount(TodoLists);
  setupTabs();
  setupSidebarToggle();
  setupForm((isEditing, editingId) => {
    CreateTodo(TodoLists, () => todoIdCounter++, isEditing, editingId);
  });
  setupListActions(setFormDataForEdit);

  DisplayList(TodoLists);
  TableDisplay(TodoLists);
});
