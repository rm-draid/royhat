const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const todoContainer = document.getElementById("tasks-todo");
  const doneContainer = document.getElementById("tasks-done");
  const todoCount = document.getElementById("todo-count");
  const doneCount = document.getElementById("done-count");

  todoContainer.innerHTML = "";
  doneContainer.innerHTML = "";

  let todoTasks = 0;
  let doneTasks = 0;

  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className = "task";
    taskElement.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">${
      task.text
    }</span>
            <div>
                <button onclick="toggleComplete(${task.id})">✔️</button>
                <button onclick="deleteTask(${task.id})">🗑️</button>
            </div>
        `;
    if (task.completed) {
      doneContainer.appendChild(taskElement);
      doneTasks++;
    } else {
      todoContainer.appendChild(taskElement);
      todoTasks++;
    }
  });

  todoCount.textContent = todoTasks;
  doneCount.textContent = doneTasks;
}

function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();

  const isDuplicate = tasks.some(
    (task) => task.text.toLowerCase() === taskText.toLowerCase()
  );

  if (taskText === "") {
    alert("Please enter a task");
  } else if (isDuplicate) {
    alert("Bu malumotni oldin kirtgansiz");
  } else {
    const newTask = { id: Date.now(), text: taskText, completed: false };
    tasks.push(newTask);
    taskInput.value = ""; // Inputni tozalash
    saveTasks(); // localStorage-ga saqlash
    renderTasks();
  }
}

function toggleComplete(id) {
  const task = tasks.find((task) => task.id === id);
  task.completed = !task.completed;
  saveTasks(); // O'zgartirishlarni saqlash
  renderTasks();
}

function deleteTask(id) {
  if (confirm("Malumotni ochirb tashlamoqchisiz")) {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    tasks.splice(taskIndex, 1);
    saveTasks(); // O'chirishni saqlash
    renderTasks();
  }
}

// Sahifa yuklanganda localStorage'dan yuklash
renderTasks();
