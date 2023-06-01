export function getData(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
 }
 
 export function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data) );
 }
 
 export function clearData(key) {
    localStorage.removeItem(key);
 }
 