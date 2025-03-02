//load da kullanabilirdik tum iceriklerin yuklenmesi kritik olmadigi icin domcontent loadded daha hizli calisacagindan bunu kullandim
document.addEventListener("DOMContentLoaded", () => {
  const taskTitle = document.querySelector("#taskTitle");
  const taskDescription = document.querySelector("#taskDescription");
  const taskForm = document.querySelector("#taskForm");
  const taskList = document.querySelector("#taskList");
  const filterCompletedButton = document.querySelector("#filterCompleted");
  const filterAllButton = document.querySelector("#filterAll");
  const sortByPriorityButton = document.querySelector("#sortByPriority");
  const titleError = document.querySelector("#titleError");
  const priorityError = document.querySelector("#sortByPriority");

  let TaskList = [];
  let isFilteringCompleted = false;
  loadLocalStorage();
  updateTaskList();

  taskForm.addEventListener("submit", handleFormSubmit);
  taskList.addEventListener("click", handleTaskListClick);
  filterCompletedButton.addEventListener("click", handleFilterCompletedTasks);
  filterAllButton.addEventListener("click", handleFilterAll);
  sortByPriorityButton.addEventListener("click", handlePriority);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
});
