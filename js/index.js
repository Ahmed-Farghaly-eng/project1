/* light-dark-function */
document.getElementById("theme-switch").addEventListener("change", function () {
    if (this.checked) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
});

/* Add New Task Form */

// get the add task form
var model = document.getElementById("addTaskModal");

// Get the button that opens the modal
var btn = document.getElementById("addNewTaskBtn");

// Get the <span> element that closes the modal
var span = document.getElementById("closeModal");

// When the user clicks the button, open the modal
btn.onclick = function () {
    model.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    model.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == model) {
        model.style.display = "none";
    }
}

/* upload new task */

// Function to load tasks from localStorage when the page loads
window.onload = function () {
    loadTasks();
};

// Create Task function
function createTask() {
    const title = document.getElementById('task-Title').value;
    const desc = document.getElementById('task-Description').value;
    const status = document.getElementById('task-status').value;

    if (title === "") {
        alert("Please enter a task title.");
        return;
    }

    const newTask = {
        id: Date.now(), // unique id for each task
        title: title,
        desc: desc,
        status: status
    };

    // Save task to localStorage
    saveTaskToLocalStorage(newTask);

    // Append task to the correct column
    appendTaskToDOM(newTask);

    // Clear input fields
    document.getElementById('task-title').value = "";
    document.getElementById('task-desc').value = "";
    document.getElementById('task-status').value = "todo";
}

// Function to save task to localStorage
function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to get tasks from localStorage
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => appendTaskToDOM(task));
}

// Function to append a task to the correct column in the DOM
function appendTaskToDOM(task) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-desc', 'm-2', 'p-2', 'py-2', 'bg-white', 'shadow-md', 'rounded-lg', 'text-wrap');
    taskCard.setAttribute('data-id', task.id); // Store task ID in DOM

    const taskTitle = document.createElement('p');
    taskTitle.classList.add('font-semibold', 'leading-tight', 'text-sm');
    taskTitle.innerText = task.title;

    const taskDesc = document.createElement('p');
    taskDesc.classList.add('mt-1', 'text-xs', 'text-gray-500', 'font-semibold');
    taskDesc.innerText = task.desc;

    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskDesc);

    // Append task to the correct column
    if (task.status === 'todo') {
        document.getElementById('todo-column').appendChild(taskCard);
    } else if (task.status === 'doing') {
        document.getElementById('doing-column').appendChild(taskCard);
    } else if (task.status === 'done') {
        document.getElementById('done-column').appendChild(taskCard);
    }
}

/* add window description */

document.querySelectorAll('.task-desc').forEach(task => {
    task.addEventListener('click', function() {
        // Open the modal
        let modal = document.getElementById("taskModal");
        modal.style.display = "block";

        // Fill modal with task info
        document.getElementById("modal-title").textContent = this.dataset.title;
        document.getElementById("modal-description").textContent = this.dataset.description;
        document.getElementById("status-select").value = this.dataset.status;

        // Keep track of the current task element
        modal.setAttribute('data-current-task', this.dataset.title);
    });
});

// Close modal on 'x' button
document.querySelector('.close').addEventListener('click', function() {
    let modal = document.getElementById("taskModal");
    modal.style.display = "none";
});

// Close the modal if clicking outside of it
window.onclick = function(event) {
    let modal = document.getElementById("taskModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


