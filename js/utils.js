export class Admin {
    saveAdminsToLocalStorage(admins){
        localStorage.setItem('admins', JSON.stringify(admins));
    }
    adminsFromLocalStorage() {
        let admins = JSON.parse(localStorage.getItem('admins') || '[]');
        return admins;
    }
}
export class Utils {
    tasksFromLocalStorage() {
        let todos = JSON.parse(localStorage.getItem('tasks') || '[]');
        return todos
    }
}
export function getData(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}
