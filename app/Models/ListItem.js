import { generateId } from "../Utils/GenerateId.js"
export default class ListItem {
    constructor({ listId, name, id = generateId(), checked = 'false' }) {
        this.name = name
        this.listId = listId
        this.id = id
        this.checked = checked
    }

    get Template() {
        if (this.checked == 'true') {
            return `
            <div class="col-8 text-left ml-4"> <input type="checkbox" id="lineitem" onclick="app.listController.checkedListItem('${this.id}')" checked> ${this.name}
            </div>
            <button onclick="app.listController.removeListItem('${this.id}')" class="col-1 mdi mdi-delete-forever-outline text-right mr-3">
            </button>
        `
        } else {
            return `
            <div class="col-8 text-left ml-4"> <input type="checkbox" id="lineitem" onclick="app.listController.checkedListItem('${this.id}')"> ${this.name}
            </div>
            <button onclick="app.listController.removeListItem('${this.id}')" class="col-1 mdi mdi-delete-forever-outline text-right mr-3">
            </button>
        `
        }
    }

}