import ListItem from "./ListItem"

interface List {
  list: ListItem[],
  load(): void,
  save(): void,
  clearList(): void,
  addItem(item: ListItem): void,
  removeItem(id: string): void
}

export default class CompleteList implements List {

  static instance: CompleteList = new CompleteList() //only one instance - singleton

  private constructor(
    private _list: ListItem[] = []
  ) {}

  get list(): ListItem[] {
    return this._list
  }

  load(): void {
    const storeList: string | null = localStorage.getItem("list")
    if (typeof storeList !== "string"){
      return
    } 

    const parsedList: {_id: string, _item: string, _checked: boolean}[] = JSON.parse(storeList)

    parsedList.forEach(item => {
      const newListItem = new ListItem(item._id, item._item, item._checked)
      CompleteList.instance.addItem(newListItem)
    })
  }

  save(): void {
    localStorage.setItem("list", JSON.stringify(this._list))
  }

  clearList(): void {
    this._list = []
    this.save()
  }

  addItem(item: ListItem): void {
    this._list.push(item)
    this.save()
  }

  removeItem(id: string): void {
    this._list = this._list.filter(item => item.id !== id)
    this.save
  }
}