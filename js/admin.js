import Users from './permision.js'
import { getData } from './utils.js'


let add = document.querySelector('.admin-add')
let login = document.querySelector('#admin-login')
let makeAdmin = document.querySelector('#makeAdmin')
let inputs = document.querySelector('.admin-check')
document.querySelector('.admin-add').addEventListener('click', () => {
    console.log('csmas');
    new Users().addUser({
        id: Math.floor(Math.random() * 1000000),
        login: login.value,
        makeAdmin: makeAdmin.checked ? true : false,
    });
});

  
new Users().addUser(getData('tasks'));
