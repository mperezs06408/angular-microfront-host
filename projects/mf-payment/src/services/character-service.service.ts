import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../utils/character-service.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterServiceService {
  constructor(private _httpClient: HttpClient) {}

  getSingleCharacter(id: number): Observable<Character> {
    return this._httpClient.get<Character>(
      `https://rickandmortyapi.com/api/character/${id}`
    );
  }
}
