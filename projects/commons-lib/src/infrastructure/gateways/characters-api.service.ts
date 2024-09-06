import { Injectable } from '@angular/core';
import { CharacterApiGateway } from '../../domain/models/gateway/character-api-gateway.model';
import { Observable, map } from 'rxjs';
import { Character } from '../../domain/models/character.model';
import { HttpClient } from '@angular/common/http';

export interface ICharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string | null;
  };
  results: Character[];
}

@Injectable({
  providedIn: 'root',
})
export class CharactersApiService extends CharacterApiGateway {
  private endpoint: string = 'https://rickandmortyapi.com/api/character';

  constructor(private _httpClient: HttpClient) {
    super();
  }

  getAllCharacters(): Observable<Character[]> {
    return this._httpClient
      .get<ICharacterResponse>(this.endpoint)
      .pipe(map((response) => response.results));
  }

  getCharacterById(id: number): Observable<Character> {
    return this._httpClient.get<Character>(`${this.endpoint}/${id}`);
  }
}
