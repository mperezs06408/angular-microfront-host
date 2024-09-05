import { Injectable } from '@angular/core';
import {
  Character,
  ICharacterResponse,
} from '../../utils/interfaces/services/charactersService.interface';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CharactersServiceService {
  constructor(private _httpClient: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    return this._httpClient
      .get<ICharacterResponse>('https://rickandmortyapi.com/api/character')
      .pipe(map((response) => response.results));
  }
}
