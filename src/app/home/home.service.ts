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
    )
  ];

  get items() {
    return [...this._items];
  }

  constructor() { }
}
