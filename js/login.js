import { admin } from "./loginOf.js";
let login = document.querySelector('#login')
let password = document.querySelector('#password')
let submit = document.querySelector('#submit')

let i = 0;

submit.addEventListener('click', () => {
    if (login.value === "" || password.value === "") {
        alert(`Логин или пороль не зополнен, пожалуйста заполните их!`);
    } else if (login.value !== "" || password.value !== "") {
        let found = false;
        for (let j = 0; j < admin.length; j++) {
            if (login.value === admin[j].login && password.value === admin[j].password) {
                let user = [{
                    login: admin[j].login,
                    password: admin[j].password,
                    id: admin[j].id,
                    canAdd: admin[j].canAdd,
                    canDelete: admin[j].canDelete,
                    canEdit: admin[j].canEdit,
                    isAdmin:admin[j].isAdmin
                }];
                window.location.href = "../pages/notes.html";
                found = true;
                localStorage.setItem("admin", JSON.stringify(user));
                break;
            }
        }
        if (!found) {
            alert("Неправильный логин или пароль!");
        }
    }
    i++;
});