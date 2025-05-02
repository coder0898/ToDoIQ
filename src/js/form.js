import { CalculateCount } from "./dash";
import { DisplayList } from "./list";
import { TableDisplay } from "./table";
import { formatDateForInput, getFormatDate, ResetForm } from "./util";

let isEditing = false;
let editingId = null;

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

  // Optionally scroll to form or focus the input
  document.getElementById("todoTitle").focus();
}

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
  DisplayList(TodoLists);
  TableDisplay(TodoLists);
  CalculateCount(TodoLists);
}
