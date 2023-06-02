import Users from './permision.js'
import Utils from './utils.js'
let add = document.querySelector('.admin-add')
let login = document.querySelector('#admin-login')
let password = document.querySelector('.admin-password')
let makeAdmin = document.querySelector('#makeAdmin')
add.addEventListener('click', () => {
    new Users().addUser(
        {
        id: Math.floor(Math.random() * 1000000),
        login: login.value,
        makeAdmin: makeAdmin.checked ? true : false,
    }
    )

})

new Users().addUser(getData('users'));
