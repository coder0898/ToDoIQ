import { createElement } from "./util";

export function TableDisplay(todoList, currentIndex, entriesPerPage) {
  const tableBody = document.querySelector(".todo-content tbody");
  tableBody.innerHTML = "";

  if (todoList.length === 0) {
    tableBody.innerHTML = `<tr class="no-records"><td>No records.</td></tr>`;
    return;
  }

  const startIndex = (currentIndex - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  const currentTodos = todoList.slice(startIndex, endIndex);

  currentTodos.forEach(
    ({ id, title, category, dueDate, todoStatus, todoPriority }) => {
      const tableRow = createElement("tr");
      const IdData = createElement("td", "", id);
      const TitleData = createElement("td", "", title);
      const CategoryData = createElement("td", "", category);
      const PriorityData = createElement("td", "", todoPriority);
      const DueDateData = createElement("td", "", dueDate);
      const CompletedData = createElement("td", "", todoStatus);
      const TodoAction = createElement("td", "todo-actions");
      const DeleteButton = createElement(
        "button",
        "delete-btn btn btn-danger",
        "Delete"
      );
      DeleteButton.setAttribute("data-id", id);
      DeleteButton.setAttribute("type", "button");
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

export function RenderPagination(todoLists, currentIndex, entriesPerPage) {
  const Totalpage = Math.ceil(todoLists.length / entriesPerPage);
  const paginationDiv = document.getElementById("paginationControls");
  paginationDiv.innerHTML = "";

  for (let i = 1; i <= Totalpage; i++) {
    const pageButton = createElement("button");
    pageButton.textContent = i;
    pageButton.disabled = i == currentIndex;
    pageButton.classList.remove("active");
    pageButton.classList.add("page-item");
    pageButton.classList.add("page-link");
    pageButton.classList.add("me-3");
    pageButton.addEventListener("click", () => {
      currentIndex = i;
      TableDisplay(todoLists, currentIndex, entriesPerPage);
      RenderPagination(todoLists, currentIndex, entriesPerPage);
      pageButton.classList.add("active");
    });
    paginationDiv.appendChild(pageButton);
  }
}
