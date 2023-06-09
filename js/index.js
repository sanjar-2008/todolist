import Tasks from "./tasks.js";
import { getData, clearData } from './utils.js'
let date = document.querySelector("#date");
let text = document.querySelector("#text");
let important = document.querySelector("#important");
let addButton = document.querySelector("#addButton");
let taskList = document.querySelector(".note-check__list");
let edit = document.querySelector('.edit');
let search = document.querySelector('#searchText');
let editText = document.querySelector('.edit-block_text');
let editDate = document.querySelector('.edit-block_date');
let admin = getData('admin')
addButton.addEventListener("click", () => {
    new Tasks().addTasks(
        {
            id: Math.floor(Math.random() * 1000000),
            text: text.value,
            date: date.value,
            important: important.checked ? true : false,
            status: false
        }
    )
    
})

taskList.addEventListener("click", (event) => {
    if (event.target.id == "delete") {
        let id = event.target.closest(".task").id;
        new Tasks().deleteTask(id);
    }
    if (event.target.id == 'edit') {
        admin.map((item)=>{
            console.log(item);
            if(item.canEdit == true){
                edit.style.display = 'block';
                let id = event.target.closest(".task").id;
                let task = new Tasks().editTask(id);
                localStorage.setItem("currentTask", id);
                
                editText.value = task[0].text;
                editDate.value = task[0].date;
            }else{
                alert("Вы не можете изменить")
            }
        })
    }

    if (event.target.closest('.textP')) {
        let id = event.target.closest('.task').id;
        new Tasks().updateStatus(id);
    }
})
search.addEventListener('input', () => {
    new Tasks().searchTask(search.value.toLowerCase());
})
document.querySelector('#logout').addEventListener('click', ()=>{
    window.location.href = '../index.html'
    localStorage.removeItem('admin');
})
let isAdmin = getData('admin')
let perm = document.querySelector('#permision')
isAdmin.map((item)=>{
    if(item.isAdmin == false){
        perm.style.display = 'none'
    }
    else if(item.isAdmin == true){
        perm.style.display = 'block'
    }
})
let editBtn = document.querySelector('.edit-block_edit');
editBtn.addEventListener('click', () => {
    edit.style.display = 'none';
    let id = document.querySelector('.task').id;
    new Tasks().saveTask(localStorage.getItem("currentTask"), editText.value, editDate.value);
})
new Tasks().renderTasks(getData('tasks'));


new Tasks().DragAndDrop()
