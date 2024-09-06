import { Observable } from 'rxjs';
import { Character } from '../character.model';

export abstract class CharacterApiGateway {
  abstract getAllCharacters(): Observable<Array<Character>>;
  abstract getCharacterById(id: number): Observable<Character>;
}
