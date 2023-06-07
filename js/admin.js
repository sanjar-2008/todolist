import Users from './permision.js';
import { getData } from './utils.js';

const add = document.querySelector('.admin-add');
const login = document.querySelector('#admin-login');
const password = document.querySelector('#admin-password');
const makeAdmin = document.querySelector('#makeAdmin');
const adminSetText = document.querySelector('.admin-settings__text');
const adminSetPass = document.querySelector('.admin-settings__password');

const users = new Users();
users.renderUser(getData('users'));

add.addEventListener('click', () => {
    const newUser = {
        id: Math.floor(Math.random() * 1000000),
        login: login.value,
        password: password.value,
        isAdmin: makeAdmin.checked,
        canEdit: false,
        canDelete: false,
        canAdd: false
    };

    users.addUser(newUser);
});

let adminList = document.querySelector('.admin-list')
adminList.addEventListener('click', (event) => {
    if (event.target.id == "delete") {
        let id = event.target.closest(".users").id;
        new Users().deleteTask(id);
    }
    if (event.target.id === 'change') {
        let changeSetings = document.querySelector('.admin-settings')
        let id = event.target.closest(".users").id;
        let userActive = document.querySelector('#active-block');
        let userAvailable = document.querySelector('#available-block');
        userActive.innerHTML = ''
        userAvailable.innerHTML = ''
        new Users().DragAndDrop(id);
        let user = new Users().changeUser(id);
        let showPasswordButton = document.querySelector('#show-password_second');
        let generateButton = document.querySelector('#generate_second');
        let passwordInput = document.querySelector('.admin-settings__password');
        changeSetings.style.display = 'block'
        localStorage.setItem("currentUser", id);
        showPasswordButton.addEventListener('click', () => {
            new Users().showPasswordSymbols(passwordInput);
        });
        generateButton.addEventListener('click', () => {
            new Users().generatePassword(passwordInput);
        });
        adminSetText.value = user[0].login;
        adminSetPass.value = user[0].password;
    }

})

let exit = document.querySelector('.admin-settings__exit')
let changeSetings = document.querySelector('.admin-settings')
exit.addEventListener('click', () => {

    changeSetings.style.display = 'none'
})
document.querySelector('#show-password').addEventListener('click', (event) => {
    let input = document.querySelector('#admin-password')
    new Users().showPasswordSymbols(input)
})

document.querySelector('#generate-password').addEventListener('click', () => {
    let input = document.querySelector('#admin-password')
    new Users().generatePassword(input)
})
document.querySelector('.admin-settings__submit').addEventListener('click', () => {
    let makeAdmin = document.querySelector('#makeAdmin')
    let adminSetText = document.querySelector('.admin-settings__text')
    let adminSetPass = document.querySelector('.admin-settings__password')
    let changeSettings = document.querySelector('.admin-settings');
    new Users().editUser(localStorage.getItem("currentUser"), makeAdmin, adminSetText.value, adminSetPass.value);
    changeSettings.style.display = 'none';
});

new Users().renderUser(getData('users'));

