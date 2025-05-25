let tasks = [];

const saveAllTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const addTask = () => {
  const taskInput = document.getElementById("task-input");
  const text = taskInput.value.trim(); // It gets the text from the task input field, trims any whitespace, and adds it to the tasks array

  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = ""; // It resets the task input field to be empty after adding the task

    updateTasksList(); // This will update the task inside the UI
  
  //console.log(tasks);// It logs the tasks array to the console for debugging purposes
  updateStats();
  saveAllTasks();
}};


const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
  updateStats();
  saveAllTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveAllTasks();
};

const editTask = (index) => {
  const taskInput = document.getElementById("task-input");
  taskInput.value = tasks[index].text;
  deleteTask(index);
  updateStats();
  saveAllTasks();
};

const updateStats = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;
  const progressFill = document.getElementById("progress-fill");
  progressFill.style.width = `${progressPercentage}%`;

  document.getElementById(
    "numbers"
  ).innerText = `${completedTasks} / ${totalTasks}`;
};

const updateTasksList = () => {
  const tasksList = document.getElementById("tasks-list");
  tasksList.innerHTML = ""; // clears if any previous tasks already exists

  tasks.forEach((task, index) => {
    const taskItems = document.createElement("list");

    taskItems.innerHTML = `
            <div class="todo-list" id="todo-list" >
                <div class="todo-item  ${task.completed ? "completed" : ""}">
                    <label class="custom-checkbox">
                    <input type="checkbox" class="checkbox" ${
                    task.completed ? "checked" : ""
                    }>
                    <span class="checkmark"></span>
                    </label>
                    <span class="task-text">${task.text}</span>
                
                    <button class="icon-btn edit" onClick="editTask(${index})"><span    class="icon-edit"></span></button>
                    <button class="icon-btn delete" onClick="deleteTask(${index})">
                    <span class="icon-trash"></span></button>
                </div>
            </div>
            

        `;
    taskItems.addEventListener("change", () => toggleTaskComplete(index));
    tasksList.appendChild(taskItems);
  });
};

// This code adds a task to the tasks array when the user clicks the "Add Task" button
document.getElementById("add-task").addEventListener("click", function (e) {
  e.preventDefault(); // It prevents the default form submission behavior

  addTask();
});
