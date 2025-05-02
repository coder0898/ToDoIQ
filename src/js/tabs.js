export function setupTabs() {
  const tabButtons = document.querySelectorAll(".tab-container .tab-link");
  const tabContent = document.querySelectorAll(".container .tab-content");

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      TabToggle(tabContent, tabButtons, index);
    });
  });
}

export function TabToggle(tabContent, tabbtn, index) {
  tabContent.forEach((content) => content.classList.remove("content-active"));
  tabbtn.forEach((button) => button.classList.remove("active"));

  tabContent[index].classList.add("content-active");
  tabbtn[index].classList.add("active");
}

export function setupSidebarToggle() {
  const toggleButton = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".menu-container");
  toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}
