let adminList = document.querySelector('.admin-list')
export default class Users {
    constructor() { }

    addUser(data) {
        data.map((item) => {
            adminList.insertAdjacentHTML('beforeend', `
                         <li id="${item.id}">
                            <p>${item.login}</p>
                            <button data-action="change">Change</button>
                            <button data-action="delete">Delete</button>
                         </li>
                         `)
        });

    }
}
