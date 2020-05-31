import { IProxyHandlerObject, IProxyOption } from './interface';
import { suportProxy, getProxyStore } from './utils';
import {
  isProxyable,
  addHandlersToTarget,
  getProxyableTarget,
  addProxyableFlagToTarget,
} from './utils';
import { GLOBAL_PROXY_HANDLERS } from './common';

let initedArray = false;
export function ProxyableByDefineProperty<T extends object>(value: T, option?: IProxyOption<T>): T {
  if (!initedArray) {
    initArray();
  }
  if (typeof value === 'object') {
    if (isProxyable(value)) {
      // tslint:disable-next-line: no-unused-expression
      option && addHandlersToTarget(value, option);
      return getProxyableTarget(value)!;
    }
    const { handlers } = addProxyableFlagToTarget(value, option);
    for (const i in value) {
      let tempV = value[i];
      Object.defineProperty(value, i, {
        configurable: true,
        get() {
          const res = ProxyableByDefineProperty(tempV as any);
          GLOBAL_PROXY_HANDLERS.get!.forEach((handler) => handler(value, i, res));
          handlers?.get.forEach((handler) => handler(value, i, res));
          return res;
        },
        set(v) {
          const oldV = tempV;
          tempV = ProxyableByDefineProperty(v);
          GLOBAL_PROXY_HANDLERS.set!.forEach((handler) => handler(value, i, tempV, oldV));
          handlers?.set.forEach((handler) => handler(value, i, tempV, oldV));
        },
      });
    }
  }
  return value;
}

function initArray() {
  // 这些会主动的去改变数组的长度，因此，这些调用后要手动的触发 length的set
  ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach((func) => {
    const originFunc = Array.prototype[func as any];
    (Array.prototype as any)[func as any] = function() {
      const oldLength = this.length;
      const res = originFunc.apply(this, arguments);
      // 重新赋值，主要目的是为了触发监听事件
      const store = getProxyStore(this);
      store?.handlers?.set.forEach((handler) =>
        handler(store.target, 'length', this.length, oldLength),
      );
      return res;
    };
  });

  // 这些事循环遍历的函数 为了能够在数组是0的时候也触发， 需要在调用这些函数的时候主动的
  ['map', 'forEach', 'filter'].forEach((func) => {
    const originFunc = Array.prototype[func as any];
    (Array.prototype as any)[func as any] = function() {
      // 调用原先方法
      const res = originFunc.apply(this, arguments);
      const store = getProxyStore(this);
      store?.handlers?.get.forEach((handler) => handler(store.target, 'length', this.length));
      return res;
    };
  });
  initedArray = true;
}
