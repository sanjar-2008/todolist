import { Admin } from "./utils.js";

let admin = new Admin().adminsFromLocalStorage()

if(admin.length === 0){
    admin = [
        {
            id: 832113,
            login: 'admin',
            password: 'admin',
            canAdd: true,
            canDelete: true,
            canEdit: true,
            isAdmin: true
        },
        {
            id: 789451,
            login: 'sanjar',
            password: 'sanjar',
            canAdd: false,
            canDelete: false,
            canEdit: false,
            isAdmin: false
        }
    ]
    new Admin().saveAdminsToLocalStorage(admin)
}
export {admin}