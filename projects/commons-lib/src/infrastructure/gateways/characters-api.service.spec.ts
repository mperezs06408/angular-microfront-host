import { TestBed } from '@angular/core/testing';

import { CharactersApiService } from './characters-api.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('CharactersApiService', () => {
  let service: CharactersApiService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withFetch())],
    });
    service = TestBed.inject(CharactersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllCharacters should return an observable', (done: DoneFn) => {
    service.getAllCharacters().subscribe((results) => {
      expect(results.length).toBe(20);
      done();
    });
  });

  it('getCharacterById should return an observable', (done: DoneFn) => {
    const id = 1;

    service.getCharacterById(id).subscribe((results) => {
      expect(results.id).toBe(id);
      done();
    });
  });
});
