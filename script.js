let tasks = [
    {
        id: 1,
        title: "Sample Task",
        description: "This is what a task looks like",
        dueDate: "2025-10-15",
        assignedTo: "Michael",
        completed: false
    }
];

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.className = "card task-item";

        const today = new Date().toISOString().split("T")[0];

        if (task.dueDate < today && !task.completed) {
            taskItem.classList.add("overdue");
        }

        if (task.completed) {
            taskItem.classList.add("task-completed");
        }

        taskItem.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <div class="task-title">${task.title}</div>
                        <div>${task.description}</div>
                        <div class="task-date">Due: ${task.dueDate}</div>
                        <div class="task-date">Assigned to: ${task.assignedTo}</div>
                    </div>

                    <div>
                        <button class="btn btn-success btn-sm"
                            onclick="completeTask(${task.id})">
                            Complete
                        </button>

                        <button class="btn btn-danger btn-sm"
                            onclick="removeTask(${task.id})">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        `;

        taskList.appendChild(taskItem);
    });
}

function addTask() {
    const name = document.getElementById("taskName").value;
    const description = document.getElementById("taskDescription").value;
    const date = document.getElementById("dueDate").value;
    const person = document.getElementById("assignedTo").value;

    if (name === "" || date === "") {
        alert("Please enter a task name and due date.");
        return;
    }

    tasks.push({
        id: Date.now(),
        title: name,
        description: description,
        dueDate: date,
        assignedTo: person,
        completed: false
    });

    document.getElementById("taskName").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("dueDate").value = "";

    renderTasks();
}

function completeTask(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = true;
    renderTasks();
}

function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

renderTasks();