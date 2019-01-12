export class LocalStorageService {
  public get(key: string, defaultValue: any = null): string
  {
    const result = localStorage.getItem(key);
    return result !== null ? result : defaultValue;
  }

  public set(key: string, value: string|number)
  {
    localStorage.setItem(key, String(value));
    return this;
  }

  public remove(key: string)
  {
    localStorage.removeItem(key);
    return this;
  }
}
