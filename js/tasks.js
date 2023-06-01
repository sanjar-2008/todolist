import { getData, setData } from "./utils.js";

let taskList = document.querySelector(".note-check__list");
let text = document.querySelector("#text");
let important = document.querySelector("#important");
let date = document.querySelector("#date");


export default class Tasks {
    constructor() {
        this.tasks = getData("tasks");
    }
    renderTasks(data) {
        taskList.innerHTML = "";
        text.value = '';
        important.checked = false;
        date.value = '';
        data.forEach((task) => {
            taskList.insertAdjacentHTML("afterbegin", `
                <li class = "task" id="${task.id}">
                    <span id="color"></span>
                    <p id="text" class="textP">${task.text}</p>
                    <span class="data">${task.date}</span>
                    <i id="delete">Delete</i>
                    <i id="edit">Edit</i>
                </li>
            `)
            let color = document.querySelector('#color')
            let textP = document.querySelector('.textP')
            let data = document.querySelector('.data')

            if (task.important == true) {
                color.style.background = 'red'

            } else color.style.background = 'orange'
            if (task.status == true) {
                if (color.style.background == 'orange') {
                    color.style.background = 'green'
                }
                if (color.style.background == 'red') {
                    color.style.background = 'green'
                }
                textP.style.textDecoration = 'line-through'
                data.style.textDecoration = 'line-through'
            }
        })
    }
    // addProcess(tasks) {
    //     tasks.forEach((item) => {
    //         const processInner = item.important && item.status
    //             ? document.querySelector('#done_second')
    //             : !item.important && item.status
    //                 ? document.querySelector('#done_second')
    //                 : item.important && !item.status
    //                     ? document.querySelector('#important_second')
    //                     : !item.important && !item.status
    //                         ? document.querySelector('#process_second')
    //                         : null;

    //         const processList = document.createElement('ul');
    //         processList.className = 'process-list';

    //         processInner.appendChild(processList);

    //         const listItem = document.createElement('li');
    //         listItem.className = 'list-item'
    //         listItem.id = item.id;
    //         listItem.draggable = true;
    //         listItem.innerHTML = `
    //         <li class = "task" id="${item.id}">
    //         <span id="color"></span>
    //         <p id="text" class="textP">${item.text}</p>
    //         <span class="data">${item.date}</span>
    //         <i id="delete">Delete</i>
    //         <i id="edit">Edit</i>
    //     </li>
    //   `;

    //         processList.appendChild(listItem);
    //     })
    // }
    addTasks(data) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(data);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        this.renderTasks(tasks);
    }

    deleteTask(id) {
        let filteredTasks = getData("tasks").filter((task) => task.id != id);

        setData("tasks", filteredTasks);
        this.renderTasks(filteredTasks);
    }

    updateStatus(id) {
        this.tasks.map((task) => {
            if (task.id == id) {
                if (task.status == false) {
                    task.status = true;
                } else task.status = false;
            }
            return task;
        });
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.renderTasks(this.tasks);
    }

    searchTask(text) {
        let filteredTasks = getData("tasks").filter((item) => {
            return item.text.toLowerCase().startsWith(text);
        })
        this.renderTasks(filteredTasks)
    }

    editTask(id) {
        let task = this.tasks.filter((task) => task.id == id);
        return task;
    }
    saveTask(id, text, date) {
        this.tasks.map((task) => {
            if (task.id == id) {
                task.text = text;
                task.date = date;
            }
        });

        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.renderTasks(this.tasks);
    }
    addProcess() {
        let noteInner = document.querySelector('.note-check__inner')
        let noteProcess = document.querySelector('#process_second')
        let noteImportant = document.querySelector('#important_second')
        let noteDone = document.querySelector('#done_second')

        this.tasks.forEach((item) => {
            if (item.important && item.status) {
                noteDone.insertAdjacentHTML('beforeend', `
                <div class = "noteStatus" id="${item.id}" draggable="true">
                <p id="text" class="noteP">${item.text}</p>
                <span class="noteSpan">${item.date}</span>
                <i id="delete">Delete</i>
                            <i id="edit">Edit</i>
            </div>
                `)
            }
            else if (!item.important && item.status) {
                noteDone.insertAdjacentHTML('beforeend', `
                    <div class = "noteStatus" id="${item.id}" draggable="true">
                    <p id="text" class="noteP">${item.text}</p>
                    <span class="noteSpan">${item.date}</span>
                    <i id="delete">Delete</i>
                            <i id="edit">Edit</i>
                </div>
                    `)
            }
            else if (item.important && !item.status) {
                noteImportant.insertAdjacentHTML('beforeend', `
                        <div class = "noteStatus" id="${item.id}" draggable="true">
                        <p id="text" class="noteP">${item.text}</p>
                        <span class="noteSpan">${item.date}</span>
                        <i id="delete">Delete</i>
                            <i id="edit">Edit</i>
                    </div>
                        `)
            }
            else if (!item.important && !item.status) {
                noteProcess.insertAdjacentHTML('beforeend', `
                            <div class = "noteStatus" id="${item.id}" draggable="true">
                            <p id="text" class="noteP">${item.text}</p>
                            <span class="noteSpan">${item.date}</span>
                            <i id="delete">Delete</i>
                            <i id="edit">Edit</i>
                        </div>
                            `)
            }
        })
    }
    DragandDrop() {
        let card = document.querySelector('.noteStatus');
        let dargs = document.querySelectorAll('.note-check__category');
        let dragStart = function() {
            setTimeout(() => {
                this.classList.add('hide');
            }, 0);
        };
    
        let dragEnd = function() {
            this.classList.remove('hide');
        };
    
        let dragOver = function(event) {
            event.preventDefault();
        };
    
        let dragEnter = function(event) {
            event.preventDefault();
            this.classList.add('hovered');
            console.log(event);
        };
    
        let dragLeave = function() {
            this.classList.remove('hovered');
        };
    
        let dragDrop = function() {
            this.append(card);
            this.classList.remove('hovered');
        };
    
        dargs.forEach((item) => {
            item.addEventListener('dragover', dragOver);
            item.addEventListener('dragenter', dragEnter);
            item.addEventListener('dragleave', dragLeave);
            item.addEventListener('drop', dragDrop);
        });
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);
    }
    
    
}  
