import Users from './permision.js';
import { getData } from './utils.js';

const add = document.querySelector('.admin-add');
let login = document.querySelector('#admin-login');
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
  location.href = location.href
  users.addUser(newUser);
});

const adminList = document.querySelector('.admin-list');
adminList.addEventListener('click', (event) => {
  if (event.target.id === 'delete') {
    const id = event.target.closest(".users").id;
    users.deleteTask(id);
  }
  if (event.target.id === 'change') {
    const changeSettings = document.querySelector('.admin-settings');
    const id = event.target.closest(".users").id;
    const userActive = document.querySelector('#active-block');
    const userAvailable = document.querySelector('#available-block');
    userActive.innerHTML = '';
    userAvailable.innerHTML = '';
    users.DragAndDrop(id);
    const user = users.changeUser(id);
    const showPasswordButton = document.querySelector('#show-password_second');
    const generateButton = document.querySelector('#generate_second');
    adminSetText.value = user[0].login;
    adminSetPass.value = user[0].password;
    changeSettings.style.display = 'block';
    
    localStorage.setItem("currentUser", id);
    showPasswordButton.addEventListener('click', () => {
      users.showPasswordSymbols(adminSetPass);
    });
    generateButton.addEventListener('click', () => {
      users.generatePassword(adminSetPass);
    });
  }
});

const exit = document.querySelector('.admin-settings__exit');
const changeSettings = document.querySelector('.admin-settings');
exit.addEventListener('click', () => {
  changeSettings.style.display = 'none';
});

document.querySelector('#show-password').addEventListener('click', (event) => {
  const input = document.querySelector('#admin-password');
  users.showPasswordSymbols(input);
});

document.querySelector('#generate-password').addEventListener('click', () => {
  const input = document.querySelector('#admin-password');
  users.generatePassword(input);
});

document.querySelector('.admin-settings__submit').addEventListener('click', () => {
  const makeAdmin = document.querySelector('#makeAdmin');
  const adminSetText = document.querySelector('.admin-settings__text');
  const adminSetPass = document.querySelector('.admin-settings__password');
  const changeSettings = document.querySelector('.admin-settings');
  users.editUser(
    localStorage.getItem("currentUser"),
    makeAdmin.checked,
    adminSetText.value,
    adminSetPass.value
  );
  changeSettings.style.display = 'none';
});

users.renderUser(getData('users'));
