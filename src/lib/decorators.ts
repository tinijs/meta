import {getMeta} from './methods';

export function GetMeta() {
  return function (target: Object, propertyKey: string) {
    Reflect.defineProperty(target, propertyKey, {
      get: () => getMeta(),
      enumerable: false,
      configurable: false,
    });
  };
}
