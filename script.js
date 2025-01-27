document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const renderTasks = () => {
        taskList.innerHTML = '';
        savedTasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = 'task ${task.completed ? "completed" : ""}';
            li.innerHTML = `
                <span>${task.name}</span>
                <button class="deleteBtn" data-index="${index}"> ✔ </button>
            `;
            li.addEventListener("click", () => toggleComplete(index));
            taskList.appendChild(li);
        });
    };

    const addTask = () => {
        const taskName = taskInput.value.trim();

        if (taskName) {
            savedTasks.push({name: taskName, completed: false});
            taskInput.value = "";
            saveAndRender();
        }
    };

    const toggleComplete = (index) => {
        savedTasks[index].completed = !savedTasks[index].completed;
        saveAndRender();
    };

    const deleteTask = (index) => {
        savedTasks.splice(index, 1);
        saveAndRender();
    };

    const saveAndRender = () => {
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        renderTasks();
    };

    addTaskBtn.addEventListener("click", addTask);

    taskList.addEventListener("click", (e) => {
        if (e.target.classList.contains("deleteBtn")) {
            const index = e.target.dataset.index;
            deleteTask(index);
        }
    });

    renderTasks();
});
