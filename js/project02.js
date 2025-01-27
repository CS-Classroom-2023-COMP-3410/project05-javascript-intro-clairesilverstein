// ========== Global Variables ==========
const newTaskInput = document.getElementById("newTaskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filterButton");

let tasks = [];

// ========== Load Tasks from localStorage ==========
function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  tasks = storedTasks ? JSON.parse(storedTasks) : [];
  renderTasks();
}

// ========== Save Tasks to localStorage ==========
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ========== Add Task ==========
function addTask() {
  const taskText = newTaskInput.value.trim();
  if (!taskText) return;

  tasks.push({
    id: Date.now(),
    text: taskText,
    completed: false,
  });

  newTaskInput.value = "";
  saveTasks();
  renderTasks();
}

// ========== Edit Task ==========
function editTask(taskId) {
  const newTaskText = prompt("Edit your task:");
  if (newTaskText !== null && newTaskText.trim()) {
    tasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: newTaskText.trim() } : task
    );
    saveTasks();
    renderTasks();
  }
}

// ========== Delete Task ==========
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasks();
  renderTasks();
}

// ========== Toggle Task Completion ==========
function toggleTaskCompletion(taskId) {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

// ========== Filter Tasks ==========
function filterTasks(filter) {
  filterButtons.forEach((button) =>
    button.classList.toggle("active", button.dataset.filter === filter)
  );

  renderTasks(filter);
}

// ========== Render Tasks ==========
function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.className = `task ${task.completed ? "completed" : ""}`;
      taskItem.draggable = true;
      taskItem.dataset.id = task.id;

      taskItem.innerHTML = `
        <input type="checkbox" ${
          task.completed ? "checked" : ""
        } onchange="toggleTaskCompletion(${task.id})" />
        <span>${task.text}</span>
        <button class="editButton" onclick="editTask(${task.id})">Edit</button>
        <button class="deleteButton" onclick="deleteTask(${task.id})">Delete</button>
      `;

      // Add drag-and-drop functionality
      taskItem.addEventListener("dragstart", handleDragStart);
      taskItem.addEventListener("dragover", handleDragOver);
      taskItem.addEventListener("drop", handleDrop);

      taskList.appendChild(taskItem);
    });
}

// ========== Drag-and-Drop Handlers ==========
let draggedTaskId = null;

function handleDragStart(e) {
  draggedTaskId = e.target.dataset.id;
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  const targetTaskId = e.target.closest(".task").dataset.id;
  const draggedIndex = tasks.findIndex((task) => task.id == draggedTaskId);
  const targetIndex = tasks.findIndex((task) => task.id == targetTaskId);

  if (draggedIndex > -1 && targetIndex > -1) {
    const [draggedTask] = tasks.splice(draggedIndex, 1);
    tasks.splice(targetIndex, 0, draggedTask);

    saveTasks();
    renderTasks();
  }
}

// ========== Event Listeners ==========
addTaskButton.addEventListener("click", addTask);
newTaskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

filterButtons.forEach((button) =>
  button.addEventListener("click", () => filterTasks(button.dataset.filter))
);

// ========== Initialize ==========
loadTasks();
