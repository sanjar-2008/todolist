import { getData, setData } from "./utils.js";

let taskList = document.querySelector(".note-check__list");
let text = document.querySelector("#text");
let important = document.querySelector("#important");
let date = document.querySelector("#date");


export default class Tasks {
    constructor() {
        this.tasks = getData("tasks");
        this.admin = getData('admin')
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

    addTasks(data) {
        this.admin.map((item) => {
            console.log(item);
            if (item.canAdd == false) {
                alert("Вы не можете добавить")
            } else if (item.canAdd == true) {
                let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
                tasks.push(data);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                this.renderTasks(tasks);
            }
        })
    }

    deleteTask(id) {
        this.admin.map((item) => {
            if (item.canDelete == false) {
                alert("Вы не можете удалить")
            }
            else if (item.canDelete == true) {
                let filteredTasks = getData("tasks").filter((task) => task.id != id);

                setData("tasks", filteredTasks);
                this.renderTasks(filteredTasks);
            }
        })
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

    updateStatusCotegory(id, status) {
        this.tasks.map((item) => {
            if (item.id == id) {
                if (status == 'process_second') {
                    item.status = false;
                    item.important = false
                }
                else if (status == 'important_second') {
                    item.status = false
                    item.important = true
                }
                else if (status == 'done_second') {
                    item.status = true
                }
            }
        })
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
        this.admin.map((item)=>{
            if(item.canEdit == false){
                alert("Вы не можете изменить")
            }
            else if(item.canEdit == true){

                let task = this.tasks.filter((task) => task.id == id);
                return task;
            }
        })
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

    DragAndDrop() {
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
        let noteInner = document.querySelectorAll('.note-check__inner')
        noteInner.forEach((item) => {

            item.addEventListener('dragstart', (e) => {
                e.target.classList.add('hide')

            })
            item.addEventListener('dragover', (e) => {
                e.preventDefault()
                e.target.classList.add('hovered')
            })
            item.addEventListener('dragleave', (e) => {
                e.preventDefault()
                e.target.classList.remove('hovered')
            })
            item.addEventListener('drop', (e) => {
                e.preventDefault()
                let dragged = document.querySelector('.hide')
                e.target.appendChild(dragged)
                dragged.classList.remove('hide')
                this.updateStatusCotegory(dragged.id, e.target.id)

            })
        })

    }
}  
