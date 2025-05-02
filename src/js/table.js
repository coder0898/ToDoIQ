import { createElement } from "./util";

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
