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
    try {
      titleError.textContent = "";
      priorityError.textContent = "";

      const title = taskTitle.value.trim();
      const description = taskDescription.value.trim();
      const priorityOption = document.querySelector(
        'input[name="priority"]:checked'
      );

      let hasError = false;

      if (!title) {
        titleError.textContent = "Title is required!!!";
        hasError = true;
      }

      if (!priorityOption) {
        priorityError.textContent = "Priority is required!!!";
        hasError = true;
      }

      if (hasError) {
        return;
      }

      const newTask = {
        id: Date.now(),
        title,
        description,
        priority: priorityOption.value,
        completed: false,
      };

      taskList.push(newTask);

      saveLocalStorage();
      updateTaskList();

      taskForm.reset();
    } catch (err) {
      console.error("Error adding task:", error);
      alert("Please try again.");
    }
  };

  const handleTaskListClick = (e) => {
    e.stopPropagation();

    if (
      e.target.classList.contains("complete-btn") ||
      e.target.closest(".complete-btn")
    ) {
      const taskItem = target.closest(".taskItem");
      const taskId = Number.parseInt(taskItem.dataset.id);
      completeTask(taskId);
    }

    if (
      e.targt.classList.contains("delete-btn") ||
      target.closest(".delete-item")
    ) {
      const taskItem = target.closest(".taskItem");
      const taskId = Number.parseInt(taskItem.dataset.id);
      deleteTask(taskId);
    }
  };

  const completeTask = (taskId) => {
    const taskIndex = taskList.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
      taskList[taskIndex].completed = !taskList[taskIndex].completed;
      saveLocalStorage();
      updateTaskList();
    }
  };

  const deleteTask = (taskId) => {
    taskList = taskList.filter((task) => task.id !== taskId);
    saveLocalStorage();
    updateTaskList();
  };

  function saveLocalStorage() {
    try {
      localStorage.setItem("taskList", JSON.stringify(taskList));
    } catch (err) {
      console.error("Error occured while saving tasks to localStorage;", err);
    }
  }

  function loadLocalStorage() {
    try {
      const savedTasks = localStorage.getItem("taskList");
      if (savedTasks) {
        taskList = JSON.parse(savedTasks);
      }
    } catch (err) {
      console.error("Error loading tasks from local storage:", err);
      tasks = [];
    }
  }
});
