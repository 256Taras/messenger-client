type IDeepReadonly<T> = T extends IAnyFunction | IPrimitive
  ? T
  : T extends ReadonlyArray<infer R>
  ? IDRArray<R>
  : T extends ReadonlyMap<infer K, infer V>
  ? IDRMap<K, V>
  : T extends ReadonlySet<infer ItemType>
  ? ReadonlySetDeep<ItemType>
  : T extends object
  ? DRObject<T>
  : T;

export type IPrimitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

export type IAnyFunction = (...args: any[]) => any;

interface IDRArray<T> extends ReadonlyArray<IDeepReadonly<T>> {}

type DRObject<T> = {
  readonly [P in keyof T]: IDeepReadonly<T[P]>;
};

interface IDRMap<K, V>
  extends ReadonlyMap<IDeepReadonly<K>, IDeepReadonly<V>> {}

interface ReadonlySetDeep<ItemType>
  extends ReadonlySet<IDeepReadonly<ItemType>> {}
