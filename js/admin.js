export let users = [
    {
        login: 'admin',
        password: 'admin',
    },
    {
        login: 'sanjar',
        password: 'sanjar',
    }
]

export function addAdmin(name, password){
    users.push({login:name, password:password})
}

export default class Users {
    saveAdmin() {
        let admins = JSON.parse(localStorage.getItem('users') || '[]');
        return admins
    }
}