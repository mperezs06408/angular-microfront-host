import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CharactersApiService } from '../infrastructure/gateways/characters-api.service';
import { LocalstorageControllerService } from '../infrastructure/controller/localstorage/localstorage-controller.service';

export interface Item {
  quantity: number;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class CommonsLibService {
  private _characters: Item[] = [];
  private localStorateItemName = 'characters';

  private _channelSource = new BehaviorSubject<number>(0);
  channelPayment$ = this._channelSource.asObservable();

  constructor(
    private _localStorageController: LocalstorageControllerService,
    public charactersGateway: CharactersApiService
  ) {
    this._localStorageController.localStorageItemName =
      this.localStorageItemName;
  }

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

    this._localStorageController.setItem(this._characters);

    return this._characters;
  }

  cleanCharactersList() {
    this._localStorageController.removeItem();

    this._characters = [];
    this._channelSource.next(0);
  }

  get charactersList() {
    const valueFromLs = this._localStorageController.getItem();

    if (valueFromLs) {
      return JSON.parse(valueFromLs) as Item[];
    }
    return this._characters;
  }

  get localStorageItemName() {
    return this.localStorateItemName;
  }
}
