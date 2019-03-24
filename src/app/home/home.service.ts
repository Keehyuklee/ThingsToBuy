import { Injectable } from '@angular/core';

import { Item } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private _items: Item[] = [
    new Item(
      1,
      'Milk',
      new Date('2019-03-17 EDT').toISOString(),
      new Date('2019-03-20 EDT').toISOString(),
      1
    ),
    new Item(
      2,
      'Light Bulb',
      new Date('2019-03-18 EDT').toISOString(),
      new Date('2019-03-25 EDT').toISOString(),
      2
    )
  ];

  get items() {
    return [...this._items];
  }

  constructor() { }

  getItem(id) {
    return {...this._items.find(i => i.id === +id)};
  }

  addItem(item: Item) {
    this._items.push(item);
  }

  updateItem(id: number, newItem: Item) {
    var index = this._items.findIndex(i => i.id === id);
    this._items[index] = newItem;
  }

  deleteItem(id: number) {
    var index = this._items.findIndex(i => i.id === id);
    this._items.splice(index, 1);
  }
}
