import { CalculateCount } from "./dash";
import { DisplayList } from "./list";
import { RenderPagination, TableDisplay } from "./table";
import { formatDateForInput, getFormatDate, ResetForm } from "./util";

const formattedDueDate = null;

export function setupForm(onAddCallback, onEditCallback) {
  // Add Form Setup
  const title = document.getElementById("TodoTitle");
  const category = document.getElementById("SelectCategory");
  const dueDate = document.getElementById("DueDateVal");
  const priority = document.getElementById("SelectPriority");
  const completed = document.getElementById("CompletedCheck");
  const checkStatus = document.getElementById("CheckStatus");
  const submitBtn = document.getElementById("submitTodo");

  completed.addEventListener("change", () => {
    checkStatus.innerText = completed.checked ? "Completed" : "Pending";
  });

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    onAddCallback();
  });

  // Edit Form Setup
  const editTitle = document.getElementById("editTodoTitle");
  const editCategory = document.getElementById("editSelectCategory");
  const editDueDate = document.getElementById("editDueDateVal");
  const editPriority = document.getElementById("editSelectPriority");
  const editCompleted = document.getElementById("editCompletedCheck");
  const editCheckStatus = document.getElementById("editCheckStatus");
  const editBtn = document.getElementById("editTodo");

  editCompleted.addEventListener("change", () => {
    editCheckStatus.innerText = editCompleted.checked ? "Completed" : "Pending";
  });

  editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    onEditCallback();
  });
}

export function setFormDataForEdit(todo) {
  document.getElementById("editTodoTitle").value = todo.title;
  document.getElementById("editSelectCategory").value = todo.category;
  document.getElementById("editDueDateVal").value = formatDateForInput(
    todo.dueDate
  );
  document.getElementById("editSelectPriority").value = todo.todoPriority;
  document.getElementById("editCompletedCheck").checked =
    todo.todoStatus === "Completed";
  document.getElementById("editCheckStatus").innerText = todo.todoStatus;

  document.getElementById("todoModal").style.display = "block";
}

export function CreateTodo(
  TodoLists,
  getNewId,
  isEditing = false,
  editingId = null,
  currentIndex,
  entriesPerPage
) {
  let title, category, dueDate, priority, isCompleted;

  const prefix = isEditing ? "edit" : "";

  title = document.getElementById(`${prefix}TodoTitle`).value.trim();
  category = document.getElementById(`${prefix}SelectCategory`).value.trim();
  dueDate = document.getElementById(`${prefix}DueDateVal`).value;
  priority = document.getElementById(`${prefix}SelectPriority`).value;
  isCompleted = document.getElementById(`${prefix}CompletedCheck`).checked;

  if (!title || !category || !dueDate || !priority) {
    return alert("Please enter valid data");
  }

  const status = isCompleted ? "Completed" : "Pending";
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
    const index = TodoLists.findIndex((item) => item.id === editingId);
    if (index !== -1) {
      TodoLists[index] = newTodo;
    }
    document.getElementById("todoModal").style.display = "none"; // Close modal
  } else {
    TodoLists.push(newTodo);
  }

  localStorage.setItem("todoList", JSON.stringify(TodoLists));
  alert(isEditing ? "Todo Updated Successfully" : "Todo Added Successfully");
  ResetForm();

  // Calculate correct page to display after addition or edit
  const totalPages = Math.ceil(TodoLists.length / entriesPerPage);
  const newPage = isEditing ? currentIndex : totalPages; // Show last page for new items
  DisplayList(TodoLists);
  TableDisplay(TodoLists, newPage, entriesPerPage);
  RenderPagination(TodoLists, newPage, entriesPerPage);
  CalculateCount(TodoLists);
}
