export abstract class LocalStorageController {
  abstract getItem(): string;
  abstract setItem(value: any): void;
  abstract removeItem(): void;
}
