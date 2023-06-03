import { getData} from "./utils.js";

let adminList = document.querySelector('.admin-list')
export default class Users {
    constructor() {
        this.users = getData("tasks")
    }

    addUser(data) {
        data.forEach((item) => {
          console.log(item);
          adminList.insertAdjacentHTML('beforeend', `
            <li id="${item.id}">
              <p>${item.login}</p>
              <button data-action="change">Change</button>
              <button data-action="delete">Delete</button>
            </li>
          `);
        });
      }
    showPasswordSymbols(inp) {
        console.log(inp);
        if (inp.type === 'password') {
            inp.type = 'text';
        } else {
            inp.type = 'password';
        }
        localStorage.setItem("users", JSON.stringify(this.users));
        this.addUser(this.users);
    }

}
