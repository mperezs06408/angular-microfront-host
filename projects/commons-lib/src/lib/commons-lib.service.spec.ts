import { TestBed } from '@angular/core/testing';

import { CommonsLibService } from './commons-lib.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('CommonsLibService', () => {
  let service: CommonsLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withFetch())],
    });
    service = TestBed.inject(CommonsLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
