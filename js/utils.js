export default class Utils {
    tasksFromLocalStorage() {
        let todos = JSON.parse(localStorage.getItem('tasks') || '[]');
        return todos
    }
    // userFromLocalStorage() {
    //     let users = JSON.parse(localStorage.getItem('users') || '[]');
    //     return users;


    // }
}
export function getData(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }
  