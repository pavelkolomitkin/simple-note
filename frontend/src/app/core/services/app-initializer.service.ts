import {Injectable} from '@angular/core';


export function appInitializeHandler(initializer: AppInitializerService)
{
  return () => {
    return initializer.initialize();
  };
}

@Injectable()
export class AppInitializerService
{
  constructor() {}

  public initialize(): Promise<any>
  {
    return new Promise<any>((resolve, reject) => {
      resolve(true);
    });
  }
}
