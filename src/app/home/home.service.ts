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
      new Date('2019-03-17'),
      new Date('2019-03-20'),
      1
    ),
    new Item(
      2,
      'Light Bulb',
      new Date(),
      new Date('2019-03-25'),
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
    console.log(this._items);
  }
}
