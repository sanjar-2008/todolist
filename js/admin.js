import Users from './permision.js'
import { getData } from './utils.js'


let add = document.querySelector('.admin-add')
let login = document.querySelector('#admin-login')
let password = document.querySelector('#admin-password')
let makeAdmin = document.querySelector('#makeAdmin')
let inputs = document.querySelector('.admin-check')
add.addEventListener('click', () => {
    new Users().addUser(

        {
            id: Math.floor(Math.random() * 1000000),
            login: login.value,
            password: password.value,
            makeAdmin: makeAdmin.checked ? true : false,
        }

    );
});

let adminList = document.querySelector('.admin-list')
adminList.addEventListener('click', (event) => {
    if (event.target.id == "delete") {
        let id = event.target.closest(".users").id;
        new Users().deleteTask(id);
    }
    if (event.target.id == 'change') {
        let changeSetings = document.querySelector('.admin-settings')
        changeSetings.style.display = 'block'
        let id = event.target.closest("li").id;
        let login = event.target.closest('#admin-login')
        let password = event.target.closest('#admin-password')
        new Users().changeUser(id,makeAdmin)
    let input = document.querySelector('#admin-password')

        new Users().showPasswordSymbols(input)
    }
})

document.querySelector('#show-password').addEventListener('click', (event) => {
    let input = document.querySelector('#admin-password')
    new Users().showPasswordSymbols(input)
})

document.querySelector('#generate-password').addEventListener('click', () => {
    let input = document.querySelector('#admin-password')
    new Users().generatePassword(input)
})
new Users().renderUser(getData('users'));
