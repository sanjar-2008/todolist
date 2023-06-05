import { getData } from "./utils.js";

let adminList = document.querySelector('.admin-list')

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

  DragAndDrop() {
    let noteInner = document.querySelector('.admin-settings-permission')
    let userActive = document.querySelector('.admin-settings-active')
    let userAvailable = document.querySelector('.admin-settings-available')

    this.users.map((item) => {
      if (item.canAdd && item.canDelete && item.canEdit) {
        userActive.insertAdjacentHTML('beforeend', `
          <div class='double-two-skills'>
            <div class='skill' draggable='true'>Can add</div>
            <div class='skill' draggable='true'>Can delete</div>
            <div class='skill' draggable='true'>Can edit</div>
          </div>`)
      } else
        if (!item.canAdd && !item.canDelete && !item.canEdit) {
          -userAvailable.insertAdjacentHTML('beforeend', `
          <div class='double-two-skills'>
            <div class='skill' draggable='true'>Can add</div>
            <div class='skill' draggable='true'>Can delete</div>
            <div class='skill' draggable='true'>Can edit</div>
          </div>`)
        } else
          if (!item.canAdd && item.canDelete && item.canEdit) {
            userActive.insertAdjacentHTML('beforeend', `
          <div class='double-two-skills'>        
            <div class='skill' draggable='true'>Can delete</div>
            <div class='skill' draggable='true'>Can edit</div>
          </div>`)
            userAvailable.insertAdjacentHTML('beforeend', `
          <div class='double-two-skills'>
            <div class='skill' draggable='true'>Can add</div>
          </div>`)
          } else
            if (item.canAdd && !item.canDelete && item.canEdit) {
              userActive.insertAdjacentHTML('beforeend', `
            <div class='double-two-skills'>
              <div class='skill' draggable='true'>Can add</div>
              <div class='skill' draggable='true'>Can edit</div>
            </div>`)
              userAvailable.insertAdjacentHTML('beforeend', `
            <div class='double-two-skills'>
              <div class='skill' draggable='true'>Can delete</div>
            </div>`)
            } else
              if (item.canAdd && item.canDelete && !item.canEdit) {
                userActive.insertAdjacentHTML('beforeend', `
            <div class='double-two-skills'>
              <div class='skill' draggable='true'>Can add</div>
              <div class='skill' draggable='true'>Can delete</div>
            </div>`)
                userAvailable.insertAdjacentHTML('beforeend', `
            <div class='double-two-skills'>
              <div class='skill' draggable='true'>Can edit</div>
            </div>`)
              } else
                if (!item.canAdd && !item.canDelete && item.canEdit) {
                  userActive.insertAdjacentHTML('beforeend', `
                <div class='double-two-skills'>
                  <div class='skill' draggable='true'>Can edit</div>
                </div>`)
                  userAvailable.insertAdjacentHTML('beforeend', `
                <div class='double-two-skills'>
                  <div class='skill' draggable='true'>Can add</div>
                  <div class='skill' draggable='true'>Can delete</div>
                </div>`)
                } else
                  if (item.canAdd && !item.canDelete && !item.canEdit) {
                    userActive.insertAdjacentHTML('beforeend', `
            <div class='double-two-skills'>
              <div class='skill' draggable='true'>Can add</div>
            </div>`)
                    userAvailable.insertAdjacentHTML('beforeend', `
            <div class='double-two-skills'>
              <div class='skill' draggable='true'>Can edit</div>
              <div class='skill' draggable='true'>Can delete</div>
            </div>`)
                  } else
                    if (!item.canAdd && item.canDelete && !item.canEdit) {
                      userActive.insertAdjacentHTML('beforeend', `
            <div class='double-two-skills'>
              <div class='skill' draggable='true'>Can delete</div>
            </div>`)
                      userAvailable.insertAdjacentHTML('beforeend', `
            <div class='double-two-skills'>
              <div class='skill' draggable='true'>Can add</div>
              <div class='skill' draggable='true'>Can edit</div>
            </div>`)
                    }

    })
  }

}