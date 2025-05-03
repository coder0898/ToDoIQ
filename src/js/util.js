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
  document.getElementById("TodoTitle").value = "";
  document.getElementById("SelectCategory").value = "";
  document.getElementById("DueDateVal").value = "";
  document.getElementById("SelectPriority").value = "";
  document.getElementById("CompletedCheck").checked = false;
  document.getElementById("TodoTitle").focus();
};

export function formatDateForInput(dateString) {
  // Convert "dd-mm-yyyy" to "yyyy-mm-dd" for input[type="date"]
  const [dd, mm, yyyy] = dateString.split("-");
  return `${yyyy}-${mm}-${dd}`;
}
