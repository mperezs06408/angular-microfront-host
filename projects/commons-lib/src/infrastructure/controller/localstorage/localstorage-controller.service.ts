import { Injectable } from '@angular/core';
import { LocalStorageController } from '../../../domain/models/controllers/localstorage-controller.model';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageControllerService extends LocalStorageController {
  private _localStorageItemName: string = 'item';

  constructor() {
    super();
  }

  set localStorageItemName(value: string) {
    this._localStorageItemName = value;
  }

  getItem(): string {
    return localStorage.getItem(this._localStorageItemName) ?? '';
  }

  setItem(value: any): void {
    localStorage.setItem(this._localStorageItemName, JSON.stringify(value));
  }

  removeItem(): void {
    localStorage.removeItem(this._localStorageItemName);
  }
}
