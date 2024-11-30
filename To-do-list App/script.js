// Add a new task
document.getElementById("plus").addEventListener("click", () => {
    const inputField = document.getElementById("input");
    const taskValue = inputField.value.trim();

    if (taskValue === "") {
        alert("Please enter a valid task");
    } else {
        const li = document.createElement("li");
        li.setAttribute("status", "pending");
        const currentDateTime = new Date().toLocaleString();

        li.innerHTML = `
            <div class="list">
                <div class="check">
                    <p>${taskValue}</p>
                    <div id="time">(Added: ${currentDateTime})</div>
                    <button class="done" onclick="completetask(this)">Completed</button>
                </div>
                <img class="trash"  src="images/delete.svg" alt="Delete">
            </div>`;

        document.getElementById("tasks").appendChild(li);
        inputField.value = "";
        saveTasksToLocalStorage();
    }
});

// Add task on pressing Enter
document.getElementById("input").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        document.getElementById("plus").click();
    }
});

// Mark task as completed
function completetask(btn) {
    const currentDateTime = new Date().toLocaleString();
    const taskItem = btn.closest("li"); 
    const taskText = btn.parentElement.firstElementChild;

    taskText.classList.add("completed");
    taskItem.setAttribute("status", "completed"); 
    
    const timeDiv = taskItem.querySelector("#time");
    timeDiv.innerHTML += ` (Completed: ${currentDateTime})`;
    
    btn.remove(); 
    saveTasksToLocalStorage();
}

// Delete a task
document.getElementById("tasks").addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        if (confirm("Are you sure you want to delete the task?")) {
            e.target.closest("li").remove();
            saveTasksToLocalStorage();
        }
    }
});

// Delete all tasks
document.getElementById("deleted").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
        document.getElementById("tasks").innerHTML = "";
        saveTasksToLocalStorage();
    }
});

// Filter tasks based on status
function filterTasks(status) {
    const tasks = document.querySelectorAll("#tasks li");
    tasks.forEach((task) => {
        const taskStatus = task.getAttribute("status");
        if (status === "all") {
            task.style.display = "flex";
        } else if (status === "completed" && taskStatus === "completed") {
            task.style.display = "flex";
        } else if (status === "pending" && taskStatus === "pending") {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}

// Highlight the active button
function setActiveButton(buttonId) {
    const buttons = document.querySelectorAll(".task-nav button");
    buttons.forEach((button) => button.classList.remove("active"));
    document.getElementById(buttonId).classList.add("active");
}

// Event listeners for filter buttons
document.getElementById("all-tasks").addEventListener("click", () => {
    filterTasks("all");
    setActiveButton("all-tasks");
});

document.getElementById("completed-tasks").addEventListener("click", () => {
    filterTasks("completed");
    setActiveButton("completed-tasks");
});

document.getElementById("uncompleted-tasks").addEventListener("click", () => {
    filterTasks("pending");
    setActiveButton("uncompleted-tasks");
});

// Save tasks to local storage
function saveTasksToLocalStorage() {
    const tasks = document.getElementById("tasks").innerHTML;
    localStorage.setItem("data", tasks);
}

// Load tasks from local storage
function loadTasksFromLocalStorage() {
    const tasks = localStorage.getItem("data");
    if (tasks) {
        document.getElementById("tasks").innerHTML = tasks;
    }
    filterTasks("all"); // Default to showing all tasks
    setActiveButton("all-tasks"); // Default active button
}

// Initial load
loadTasksFromLocalStorage();
