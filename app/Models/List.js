import { ProxyState } from "../AppState.js"
import { generateId } from "../Utils/GenerateId.js"
export default class List {
  constructor({ name, color, id = generateId() }) {
    this.name = name
    this.color = color
    this.id = id
  }

  get Template() {
    return `
    <div class="col-md-4 mt-3">
    <div
        class="d-flex flex-column justify-content-between text-center bg-light rounded shadow-light mx-5 min-vh-50">
        <div class="bg-primary">
            <div class="col-12 text-right font-large"> <button title="Delete list" onclick="app.listController.destroy('${this.id}')"> &times; </button></div>
            <div class="col-12 text-center"> <b>${this.name}</b></div>
            <small class="text-muted"> ${this.MyListItemsAmount} </small>
        </div>
        <!-- insert line items here -->
        <div class="row">
            ${this.MyListItems}
        </div>
        <!-- submit new line item form -->
        <div class="col-12 py-3">
            <form onsubmit="app.listController.addListItem('${this.id}')">
                <input required name="listItem" minlength="3" maxlength="15" type="text" class="text-muted"
                    placeholder="Add Task..." class="border-bottom"></input>
                <button type="submit"><i class="mdi mdi-plus"></i></button>
            </form>
        </div>
    </div>
</div>
    `
  }
  get MyListItems() {
    let template = ''
    let listItems = ProxyState.listItems.filter(listItem => listItem.listId === this.id)
    listItems.forEach(li => {
      template += li.Template
    })
    if (!template) {
      template += `<div class="col-8 text-left ml-4"> Empty list!   :-(</div>`
    }
    return template
  }

  get MyListItemsAmount() {
    let listItemsTotal = 0
    let listItemsChecked = 0
    let listItems = ProxyState.listItems.filter(listItem => listItem.listId === this.id)
    listItems.forEach(li => {
      listItemsTotal++
      if (li.checked = true) {
        listItemsChecked++
      }
    })
    return `${listItemsChecked}/${listItemsTotal}`
  }

}