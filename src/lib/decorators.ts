import {getMeta} from './methods';

export function UseMeta() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getMeta(),
    });
  };
}
