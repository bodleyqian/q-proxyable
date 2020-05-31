import { GlobalGetFunc, GlobalSetFunc, GlobalDeleteFunc, IProxyHandlerObject } from './interface';
import { EventEmitter } from 'events';
export const SYMBOL_OF_PROXYABLE = Symbol('SYMBOL_OF_PROXYABLE');

export const GLOBAL_PROXY_HANDLERS: IProxyHandlerObject<any> = {
  get: [],
  set: [],
  delete: [],
};

const centerEmitter = new EventEmitter();
