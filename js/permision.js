import { getData } from "./utils.js";

let adminList = document.querySelector('.admin-list')
let makeAdmin = document.querySelector('#makeAdmin')

export default class Users {
  constructor() {
    this.users = getData("users");
  }

  renderUser(data) {
    const adminList = document.querySelector('.admin-list');
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
    const users = [...this.users, data];
    localStorage.setItem("users", JSON.stringify(users));
    this.renderUser(users);
  }

  deleteTask(id) {
    const filteredUsers = this.users.filter((user) => user.id != id);

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
  changeUser(id) {
    let user = this.users.filter((user) => user.id == id);
    return user;
  }

  editUser(id, admin, login, password) {
    this.users.forEach((item) => {
      if (item.id == id) {
        item.password = password;
        item.login = login;
        if (admin.checked == true) {
          let makeAdminSecond = document.querySelector('#make-admin_second');
          makeAdminSecond.checked = true;
          admin.checked = true;
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

  DragAndDrop(id) {
    let userActive = document.querySelector('#active-block');
    let userAvailable = document.querySelector('#available-block');

    this.users.forEach((item) => {
      if (item.id == id) {
        if (item.canAdd && item.canDelete && item.canEdit) {
          userActive.insertAdjacentHTML('beforeend', `
            <div class='skill' draggable='true'>Can add</div>
            <div class='skill' draggable='true'>Can delete</div>
            <div class='skill' draggable='true'>Can edit</div>
          `);
        } else {
          if (!item.canAdd && !item.canDelete && !item.canEdit) {
            userAvailable.insertAdjacentHTML('beforeend', `
              <div class='skill' draggable='true'>Can add</div>
              <div class='skill' draggable='true'>Can delete</div>
              <div class='skill' draggable='true'>Can edit</div>
            `);
          } else {
            if (!item.canAdd && item.canDelete && item.canEdit) {
              userActive.insertAdjacentHTML('beforeend', `
                <div class='skill' draggable='true'>Can delete</div>
                <div class='skill' draggable='true'>Can edit</div>
              `);
              userAvailable.insertAdjacentHTML('beforeend', `
                <div class='skill' draggable='true'>Can add</div>
              `);
            } else {
              if (item.canAdd && !item.canDelete && item.canEdit) {
                userActive.insertAdjacentHTML('beforeend', `
                  <div class='skill' draggable='true'>Can add</div>
                  <div class='skill' draggable='true'>Can edit</div>
                `);
                userAvailable.insertAdjacentHTML('beforeend', `
                  <div class='skill' draggable='true'>Can delete</div>
                `);
              } else {
                if (item.canAdd && item.canDelete && !item.canEdit) {
                  userActive.insertAdjacentHTML('beforeend', `
                    <div class='skill' draggable='true'>Can add</div>
                    <div class='skill' draggable='true'>Can delete</div>
                  `);
                  userAvailable.insertAdjacentHTML('beforeend', `
                    <div class='skill' draggable='true'>Can edit</div>
                  `);
                } else {
                  if (!item.canAdd && !item.canDelete && item.canEdit) {
                    userActive.insertAdjacentHTML('beforeend', `
                      <div class='skill' draggable='true'>Can edit</div>
                    `);
                    userAvailable.insertAdjacentHTML('beforeend', `
                      <div class='skill' draggable='true'>Can add</div>
                      <div class='skill' draggable='true'>Can delete</div>
                    `);
                  } else {
                    if (item.canAdd && !item.canDelete && !item.canEdit) {
                      userActive.insertAdjacentHTML('beforeend', `
                        <div class='skill' draggable='true'>Can add</div>
                      `);
                      userAvailable.insertAdjacentHTML('beforeend', `
                        <div class='skill' draggable='true'>Can edit</div>
                        <div class='skill' draggable='true'>Can delete</div>
                      `);
                    } else {
                      if (!item.canAdd && item.canDelete && !item.canEdit) {
                        userActive.insertAdjacentHTML('beforeend', `
                          <div class='skill' draggable='true'>Can delete</div>
                        `);
                        userAvailable.insertAdjacentHTML('beforeend', `
                          <div class='skill' draggable='true'>Can add</div>
                          <div class='skill' draggable='true'>Can edit</div>
                        `);
                      }
                    }
                  }
                }
              }
            }
          }
        }

        const skills = document.querySelectorAll('.skill');
        const outside = document.querySelectorAll('.admin-settings-active')
        outside.forEach((skill) => {
          skill.addEventListener('dragstart', (event) => {
            event.target.classList.add('dragged');
          });

          skill.addEventListener('dragover', (event) => {
            event.preventDefault();
          });

          skill.addEventListener('dragleave', (event) => {
            event.preventDefault();
          });

          skill.addEventListener('drop', (event) => {
            const droppedElement = document.querySelector('.dragged');
            const targetContainer = event.target
            console.log(targetContainer);
            targetContainer.appendChild(droppedElement);
            droppedElement.classList.remove('dragged')
            this.users.map((item) => {
              console.log(item);
              if (item.id == id) {
                console.log(id);
                if (targetContainer.id === 'active-block') {
                  if (droppedElement.textContent == 'Can add') {
                    item.canAdd = true;
                  }
                  if (droppedElement.textContent == 'Can edit') {
                    item.canEdit = true;
                  }
                  if (droppedElement.textContent == 'Can delete') {
                    item.canDelete = true;
                  }
                }
                if (droppedElement.id === 'available-block') {
                  if (droppedElement.textContent == 'Can add') {
                    item.canAdd = false;
                  }
                  if (droppedElement.textContent == 'Can edit') {
                    item.canEdit = false;
                  }
                  if (droppedElement.textContent == 'Can delete') {
                    item.canDelete = false;
                  }

                }
              }

            })


            localStorage.setItem('users', JSON.stringify(this.users));

          });
        });
        localStorage.setItem('users', JSON.stringify(this.users));

      }
    });
    localStorage.setItem('users', JSON.stringify(this.users));

  }


}