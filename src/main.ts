import './css/style.scss'
import CompleteList from './model/CompleteList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
  const completeList = CompleteList.instance
  const template = ListTemplate.instance

  const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement

  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault()

    //new item value
    let input = document.getElementById("newItem") as HTMLInputElement
    const newEntryText: string = input.value.trim()
    if (!newEntryText.length) return

    //calculate item ID
    const itemId: number = completeList.list.length
      ? parseInt(completeList.list[completeList.list.length - 1].id) + 1
      : 1

    const newItem = new ListItem(itemId.toString(), newEntryText)
    completeList.addItem(newItem)
    input.value = ""
    template.render(completeList)
  })

  const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement

  clearItems.addEventListener('click', (): void => {
    completeList.clearList()
    template.clear()
  })

  completeList.load()
  template.render(completeList)
}

document.addEventListener("DOMContentLoaded", initApp) 