export default class Utils {
    tasksFromLocalStorage() {
        let todos = JSON.parse(localStorage.getItem('tasks') || '[]');
        return todos
    }
}
export function getData(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }
  