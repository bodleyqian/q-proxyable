export type GlobalGetFunc<T = any, K = any> = (
  target: T,
  prop: string | number | symbol,
  value: K,
) => void;

export type GlobalSetFunc<T = any, K = any> = (
  target: T,
  prop: string | number | symbol,
  value: K,
  oldValue: K,
) => void;

export type GlobalDeleteFunc<T = any, K = any> = (
  target: T,
  prop: string | number | symbol,
  oldValue: K,
) => void;

export interface IProxyableStoreData<T> {
  target?: T;
  proxy?: T;

  handlers?: IProxyHandlerObject<T>;

  isProxy?: boolean;
}

export interface IProxyOption<T> {
  get?: GlobalGetFunc<T>;
  set?: GlobalSetFunc<T>;
  delete?: GlobalDeleteFunc<T>;
}

export interface IProxyHandlerObject<T> {
  get: Array<GlobalGetFunc<T>>;
  set: Array<GlobalSetFunc<T>>;
  delete: Array<GlobalDeleteFunc<T>>;
}
