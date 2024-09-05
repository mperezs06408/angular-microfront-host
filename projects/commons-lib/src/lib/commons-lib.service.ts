import { Injectable } from '@angular/core';
import { Item } from '../utils/interfaces/commonItem.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonsLibService {
  private _characters: Item[] = [];
  private localStorateItemName = 'characters';

  private _channelSource = new BehaviorSubject<number>(0);
  channelPayment$ = this._channelSource.asObservable();

  constructor() {}

  private onCountCharactersQuantity() {
    this._channelSource.next(
      this._characters.reduce((acc, c) => acc + c.quantity, 0)
    );
  }

  initSavedCharacters(items: Item[]) {
    this._characters = items;

    this.onCountCharactersQuantity();
  }

  sendData(characterId: number): Item[] {
    const existingElementIndex = this._characters.findIndex(
      (i) => i.id === characterId
    );

    if (existingElementIndex !== -1) {
      this._characters[existingElementIndex] = {
        id: characterId,
        quantity: this._characters[existingElementIndex].quantity + 1,
      };
    } else {
      this._characters.push({ id: characterId, quantity: 1 });
    }

    this.onCountCharactersQuantity();

    localStorage.setItem(
      this.localStorateItemName,
      JSON.stringify(this._characters)
    );

    return this._characters;
  }

  cleanCharactersList() {
    localStorage.removeItem(this.localStorageItemName);

    this._characters = [];
    this._channelSource.next(0);
  }

  get charactersList() {
    const valueFromLs = localStorage.getItem(this.localStorageItemName);

    if (valueFromLs) {
      return JSON.parse(valueFromLs) as Item[];
    }
    return this._characters;
  }

  get localStorageItemName() {
    return this.localStorateItemName;
  }
}
