
import { ProxyState } from "../AppState.js";
import ListItem from "../Models/ListItem.js";
import List from "../Models/List.js"

export function saveState() {
  localStorage.setItem('JaronsList', JSON.stringify({
    lists: ProxyState.lists,
    listItems: ProxyState.listItems
  }))
  console.log('saved state', ProxyState)
}

export function loadState() {
  let data = JSON.parse(localStorage.getItem('JaronsList'))
  console.log(data)
  if (data != null) {
    ProxyState.lists = data.lists.map(p => new List(p))
    ProxyState.listItems = data.listItems.map(t => new ListItem(t))
  }

}