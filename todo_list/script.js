
"use strict";
        
let taskList = [
    {"id": 1, "taskName": "Task 1"},
    {"id": 2, "taskName": "Task 2"},
    {"id": 7, "taskName": "Task 3"},
    {"id": 4, "taskName": "Task 4"},
];

let editId;
let isEditTask = false;

const taskInput = document.querySelector("#txtTaskName");
const btnClear = document.querySelector("#btnClear");

displayTasks();

function displayTasks() {
    let ul = document.getElementById("task-list");
    ul.innerHTML = "";

    if (taskList.length == 0) {
        ul.innerHTML = "<p class='p-3 m-0'>Task list empty</p>"
    } else {

        for(let task of taskList) {

            let li = `
                <li class="task list-group-item">
                    <div class="form-check">
                        <input type="checkbox" id="${task.id}" class="form-check-input">
                        <label for="${task.id}" class="form-check-label">${task.taskName}</label>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a onclick="deleteTask(${task.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash-can"></i> Sil</a></li>
                            <li><a onclick='editTask(${task.id}, "${task.taskName}")' class="dropdown-item" href="#"><i class="fa-solid fa-pen"></i> Düzenle</a></li>
                        </ul>
                    </div>
                </li>
            `;
            
            ul.insertAdjacentHTML("beforeend", li);           

        }
    }
}

document.querySelector("#btnAddNewTask").addEventListener("click", newTask);
document.querySelector("#btnAddNewTask").addEventListener("keypress", function(){
    if (event.key == "Enter") {
        document.getElementById("btnAddNewTask").click();
    }
});

function newTask(event) {

    if(taskInput.value == "") {
        alert("You must enter new task!");
    } else {
        if(!isEditTask) {
            // add
            taskList.push({"id": taskList.length + 1, "taskName": taskInput.value});
        } else {
            // update
            for(let task of taskList) {
                if(task.id == editId) {
                    task.taskName = taskInput.value;
                }
                isEditTask = false;
            }
        }
        taskInput.value = "";
        displayTasks();
    }

    event.preventDefault();
}       

function deleteTask(id) {

    let deletedId;
    
    for(let index in taskList) {
        if(taskList[index].id == id) {
            deletedId = index;
        }
    }

    taskList.splice(deletedId, 1);
    displayTasks();
}

function editTask(taskId, taskName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = taskName;
    taskInput.focus();
    taskInput.classList.add("active");

    console.log("edit id:", editId);
    console.log("edit mode", isEditTask);
}

btnClear.addEventListener("click", function() {
    taskList.splice(0, taskList.length);
    displayTasks();
})
