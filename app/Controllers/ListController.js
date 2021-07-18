import { ProxyState } from "../AppState.js";
import { listService } from "../Services/ListService.js";
import { loadState, saveState } from "../Utils/LocalStorage.js"

function _draw() {
  let template = ''
  let lists = ProxyState.lists
  lists.forEach(list => template += list.Template)
  document.getElementById('lists').innerHTML = template
}
export default class ListController {
  constructor() {
    ProxyState.on('lists', _draw)
    ProxyState.on('listItems', _draw)
    ProxyState.on('lists', saveState)
    ProxyState.on('listItems', saveState)

    loadState()

    // NOTE this is here so when the page first loads it draws the lists already in the proxystate
    // _draw()
  }


  createList() {
    // NOTE PREVENTS PAGE RELOADING
    event.preventDefault()
    let form = event.target
    let rawList = {
      name: form.listName.value,
      color: form.colorpicker.value,
    }
    console.log(rawList.color)
    listService.createList(rawList)
    form.reset()
  }


  destroy(id) {
    listService.destroy(id)
  }
  //add form list item name
  addListItem(listId) {
    event.preventDefault()
    let form = event.target
    let rawListItem = {
      listId,
      name: form.listItem.value
    }
    listService.addListItem(rawListItem)
    form.reset()
  }

  removeListItem(id) {
    listService.removeListItem(id)
  }
  checkedListItem(id) {
    listService.checkedListItem(id)
  }

}

