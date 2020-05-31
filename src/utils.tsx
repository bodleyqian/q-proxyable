import { SYMBOL_OF_PROXYABLE } from './common';
import { IProxyableStoreData, IProxyHandlerObject, IProxyOption } from './interface';

/**
 * 是否是被代理过的对象
 * @param value 对象
 */
export function isProxyable<T extends object>(value: T) {
  if (value && typeof value === 'object') {
    return value.hasOwnProperty(SYMBOL_OF_PROXYABLE);
  }
  return false;
}

/**
 * 是否支持代理
 */
export function suportProxy() {
  return !!Proxy;
}

/**
 * 获取对象的存储额外记录的对象
 * @param target
 */
export function getProxyStore<T>(target: T) {
  if (target) {
    const store: IProxyableStoreData<T> = (target as any)[SYMBOL_OF_PROXYABLE];
    // 记录proxy
    return store;
  }
  return null;
}

/**
 * 给对象添加被代理过的标记
 * @param target
 */
export function addProxyableFlagToTarget<T extends object>(
  target: T,
  option?: IProxyOption<T>,
  isProxy: boolean = suportProxy(),
): IProxyableStoreData<T> {
  const tempProto: any = Array.isArray(target) ? [] : {};
  (target as any).__proto__ = tempProto;
  const handlers = {
    get: [],
    set: [],
    delete: [],
  };
  for (const i in option) {
    (handlers as any)[i].push((option as any)[i]);
  }
  // 记录一些必要的信息
  tempProto[SYMBOL_OF_PROXYABLE] = {
    target,
    handlers,
    isProxy,
  };
  return tempProto[SYMBOL_OF_PROXYABLE];
}

/**
 * 给存储代理值的对象添加代理对象
 * @param target
 * @param proxy
 */
export function storeProxyableDataWithTarget<T>(target: T, proxy: T) {
  // console.log(target, proxy);
  if (target) {
    const store = getProxyStore(target);
    if (store) {
      // 记录proxy
      store.proxy = proxy;
    }
  }
}

/**
 * 获取对象的原始对象
 * @param target
 */
export function getOriginTarget<T extends object>(target: T) {
  if (target) {
    const store = getProxyStore(target);
    if (store) {
      return store.target;
    }
  }
  return null;
}

/**
 * 获取对象的代理对象
 * @param value
 * @param option
 */
export function getProxyableTarget<T extends object>(target: T) {
  if (target) {
    const store = getProxyStore(target);
    if (store) {
      return store.proxy;
    }
  }
  return null;
}

export function addHandlersToTarget<T>(target: T, option: IProxyOption<T>) {
  if (target) {
    const store = getProxyStore(target);
    if (store) {
      if (option) {
        // 存储
        const handlers = store.handlers!;
        for (const i in option) {
          (handlers as any)[i].push((option as any)[i]);
        }
      }
    }
  }
}
