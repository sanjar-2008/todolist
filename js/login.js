import { admin } from "./loginOf.js";
console.log(admin);
let login = document.querySelector('#login')
let password = document.querySelector('#password')
let submit = document.querySelector('#submit')

let i = 0;
submit.addEventListener('click', () => {
    if (login.value === "" || logPass.value === "") {
        alert(`You did not write a password or email! Please check.`);
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
                new Current().saveUserToLocalStorage(user);
                alert(`Welcome, ${admin[j].login}!`);
                window.location.href = "../20.ToDo List/pages/index.html";
                found = true;
                break;
            }
        }
        if (!found) {
            alert("Wrong login or password");
        }
    }
    i++;
});