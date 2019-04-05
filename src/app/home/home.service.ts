import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

import { Item } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private _items = new BehaviorSubject<Item[]>([
    new Item(
      1,
      'Milk',
      new Date('2019-03-20 EDT').toISOString(),
      new Date('2019-04-20 EDT').toISOString(),
      1
    ),
    new Item(
      2,
      'Light Bulb',
      new Date('2019-03-18 EDT').toISOString(),
      new Date('2019-04-25 EDT').toISOString(),
      2
    )
  ]);

  get items() {
    return this._items.asObservable();
  }

  constructor() { }

  getItem(id) {
    return this.items.pipe(take(1), map(items => {
      return {...items.find(i => i.id.toString() === id)}
    }));
  }

  addItem(newItem: Item) {
    return this.items.pipe(take(1), tap(items => {
      this._items.next(items.concat(newItem));
    }));
  }

  updateItem(id: number, newItem: Item) {
    return this.items.pipe(
      take(1),
      tap(items => {
        const index = items.findIndex(i => i.id === id);
        const updatedItems = [...items];
        updatedItems[index] = newItem;
        this._items.next(updatedItems);
      })
    );
  }

  deleteItem(id: number) {
    return this.items.pipe(
      take(1),
      tap(items => {
        const index = items.findIndex(i => i.id === id);
        const updatedItems = items.splice(index ,1);
        this._items.next(updatedItems);
      })
    )
  }
}
