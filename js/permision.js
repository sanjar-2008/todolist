import { getData } from "./utils.js";

let adminList = document.querySelector('.admin-list')
let login = document.querySelector('#admin-login')
let password = document.querySelector('#admin-password')
let makeAdmin = document.querySelector('#makeAdmin')

export default class Users {
  constructor() {
    this.users = getData("users")
  }

  renderUser(data) {
    adminList.innerHTML = "";
    data.forEach((item) => {
      adminList.insertAdjacentHTML('afterbegin', `
        <li class="users" id="${item.id}">
          <p>${item.login}</p>
          <button id="change">Change</button>
          <button id="delete">Delete</button>
        </li>
      `);
    });

  }

  addUser(data) {
    let user = JSON.parse(localStorage.getItem("users")) || [];
    user.push(data);
    localStorage.setItem("users", JSON.stringify(user));
    this.renderUser(user);
  }

  deleteTask(id) {
    let filteredUsers = getData("users").filter((task) => task.id != id);

    localStorage.setItem("users", JSON.stringify(filteredUsers));
    this.renderUser(filteredUsers);
  }

  showPasswordSymbols(input) {
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
    localStorage.setItem("users", JSON.stringify(this.users));
    this.renderUser(this.users);
  }

  generatePassword(input) {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let string_length = 8;
    let randomstring = '';
    for (let i = 0; i < string_length; i++) {
      let rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    input.value = randomstring
    localStorage.setItem("users", JSON.stringify(this.users));
    this.renderUser(this.users);
  }
  changeUser(id, login, password,admin) {
    this.users.forEach((item) => {
      if (item.id == id) {
        password = item.password
        login = item.login
        if(item.admin == true){
          item.admin =true 
        }
      }
    });
  
    let loginEdit = document.querySelector('.admin-settings__text');
    let passwordEdit = document.querySelector('.admin-settings__password');
    loginEdit.value = login;
    passwordEdit.value = password;

    localStorage.setItem("users", JSON.stringify(this.users));
    this.renderUser(this.users);
  }
  
  
  

}
