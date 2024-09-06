import { LocalstorageControllerService } from './localstorage-controller.service';

describe('LocalstorageControllerService', () => {
  let service: LocalstorageControllerService;
  let localStore: { [key: string]: string };

  beforeEach(() => {
    localStore = {};

    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + '')
    );
    spyOn(window.localStorage, 'removeItem').and.callFake(
      (key) => delete localStore[key]
    );

    service = new LocalstorageControllerService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should to set value on local storage', () => {
    const testValue = 'test_value';
    service.setItem(testValue);

    expect(service.getItem()).toBe(JSON.stringify(testValue));
  });

  it('should to set value on local storage and remove it', () => {
    const testValue = 'test_value';
    service.setItem(testValue);

    service.removeItem();
    expect(service.getItem()).toBe('');
  });
});
