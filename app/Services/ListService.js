import { ProxyState } from "../AppState.js";
import List from "../Models/List.js";
import ListItem from "../Models/ListItem.js";
import { saveState } from "../Utils/LocalStorage.js"

class ListService {
  createList(rawList) {
    ProxyState.lists = [...ProxyState.lists, new List(rawList)]
  }

  addListItem(rawListItem) {
    ProxyState.listItems = [...ProxyState.listItems, new ListItem(rawListItem)]
  }

  destroy(id) {
    if (window.confirm("Are you sure you want to delete the list?")) {
      ProxyState.lists = ProxyState.lists.filter(list => list.id != id)
      ProxyState.listItems = ProxyState.listItems.filter(listItem => listItem.listId != id)
    }
  }
  removeListItem(id) {
    if (window.confirm("Delete Item?")) {
      ProxyState.listItems = ProxyState.listItems.filter(listItem => listItem.id != id)
    }
  }

  checkedListItem(id) {
    ProxyState.listItems.forEach(li => {
      if (li.id === id) {
        if (li.checked === 'true') {
          li.checked = 'false'
          console.log(li.checked)
        } else {
          li.checked = 'true'
          console.log(li.checked)
        }
      }
      saveState()
    });
    // let listItem = ProxyState.listItems.filter(listItem => listItem.id === id)
    // if (listItem.checked === 'true') {
    //   listItem.checked = 'false'
    //   console.log(listItem.checked)
    // } else {
    //   listItem.checked = 'true'
    //   console.log(listItem.checked)
    // }
  }

}

export const listService = new ListService()