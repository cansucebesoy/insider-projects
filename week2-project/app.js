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
  const priorityError = document.querySelector("#priorityError");

  let tasks = [];
  let isFilteringCompleted = false;
  loadLocalStorage();
  updateTaskList();

  taskForm.addEventListener("submit", handleFormSubmit);
  taskList.addEventListener("click", handleTaskListClick);
  filterCompletedButton.addEventListener("click", handleFilterCompletedTasks);
  filterAllButton.addEventListener("click", handleFilterAll);
  sortByPriorityButton.addEventListener("click", handlePriority);

  function handleFormSubmit(e) {
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

      tasks.push(newTask);

      saveLocalStorage();
      updateTaskList();

      taskForm.reset();
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Please try again.");
    }
  }

  function handleTaskListClick(e) {
    e.stopPropagation();
    const target = e.target;

    if (
      target.classList.contains("complete-btn") ||
      target.closest(".complete-btn")
    ) {
      const taskItem = target.closest(".task-item");
      const taskId = Number.parseInt(taskItem.dataset.id);
      completeTask(taskId);
    }

    if (
      target.classList.contains("delete-btn") ||
      target.closest(".delete-btn")
    ) {
      const taskItem = target.closest(".task-item");
      const taskId = Number.parseInt(taskItem.dataset.id);
      deleteTask(taskId);
    }
  }

  function completeTask(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      saveLocalStorage();
      updateTaskList();
    }
  }

  function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    saveLocalStorage();
    updateTaskList();
  }

  function saveLocalStorage() {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (err) {
      console.error("Error occured while saving tasks to localStorage;", err);
    }
  }

  function loadLocalStorage() {
    try {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        tasks = JSON.parse(savedTasks);
      }
    } catch (err) {
      console.error("Error loading tasks from local storage:", err);
      tasks = [];
    }
  }

  function handleFilterCompletedTasks() {
    isFilteringCompleted = true;
    updateTaskList();

    filterCompletedButton.classList.remove("button-secondary");
    filterCompletedButton.classList.add("button-primary");
    filterAllButton.classList.remove("button-primary");
    filterAllButton.classList.add("button-secondary");
  }

  function handleFilterAll() {
    isFilteringCompleted = false;
    updateTaskList();

    filterAllButton.classList.remove("button-secondary");
    filterAllButton.classList.add("button-primary");
    filterCompletedButton.classList.remove("button-primary");
    filterCompletedButton.classList.add("button-secondary");
  }

  function handlePriority() {
    const priorityOrder = { high: 1, medium: 2, low: 3 };

    tasks.sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    saveLocalStorage();
    updateTaskList();
  }

  function updateTaskList() {
    taskList.innerHTML = "";

    const tasksToDisplay = isFilteringCompleted
      ? tasks.filter((task) => task.completed)
      : tasks;

    if (tasksToDisplay.length === 0) {
      const emptyState = document.createElement("div");
      emptyState.className = "empty-state";

      const message = isFilteringCompleted
        ? "No completed tasks."
        : "No tasks added yet.";

      emptyState.innerHTML = `<p>${message}</p>`;
      taskList.appendChild(emptyState);
      return;
    }

    tasksToDisplay.forEach((task) => {
      const taskItem = document.createElement("div");
      taskItem.className = `task-item ${task.completed ? "completed" : ""}`;
      taskItem.dataset.id = task.id;

      const priorityLabels = {
        low: "Low",
        medium: "Medium",
        high: "High",
      };

      taskItem.innerHTML = `
            <div class="task-header">
              <h3 class="task-title ${
                task.completed ? "task-completed" : ""
              }">${task.title}</h3>
              <div class="task-actions">
                <button class="button button-small button-secondary complete-btn" title="${
                  task.completed ? "Mark as incomplete" : "Mark as complete"
                }">
                  ${task.completed ? "Undo" : "Complete"}
                </button>
                <button class="button button-small button-destructive delete-btn" title="Delete task">Delete</button>
              </div>
            </div>
            ${
              task.description
                ? `<div class="task-description">${task.description}</div>`
                : ""
            }
            <div class="task-meta">
              <span class="task-priority priority-${task.priority}">${
        priorityLabels[task.priority]
      }</span>
            </div>
          `;

      taskList.appendChild(taskItem);
    });
  }
});
