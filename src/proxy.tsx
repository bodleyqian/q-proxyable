import {
  isProxyable,
  getProxyableTarget,
  addProxyableFlagToTarget,
  addHandlersToTarget,
} from './utils';
import { GLOBAL_PROXY_HANDLERS } from './common';
import { storeProxyableDataWithTarget } from './utils';
import { IProxyHandlerObject, IProxyOption } from './interface';

export function ProxyableByProxy<T extends object>(value: T, option?: IProxyOption<T>): T {
  if (typeof value === 'object') {
    if (isProxyable(value)) {
      // 这个对象已经被代理过了 找到这个代理后的对象
      // tslint:disable-next-line: no-unused-expression
      option && addHandlersToTarget(value, option);
      return getProxyableTarget(value)!;
    }
    // 给这个对象加个标识，标识这是一个被proxy过的对象 这时还没有proxy
    const { handlers } = addProxyableFlagToTarget(value, option);
    // 能够走到这里标识肯定没有Proxyable过
    const ProxyValue = new Proxy(value, {
      get(target, prop) {
        // 获取的子值也是响应式的
        const res = ProxyableByProxy((target as any)[prop]);
        // 公共的处理函数
        GLOBAL_PROXY_HANDLERS.get!.forEach((handler) => handler(target, prop, res));
        // 单个的处理函数
        handlers?.get.forEach((handler) => handler(target, prop, res));
        return res;
      },
      set(target, prop, v) {
        const oldValue = (target as any)[prop];
        const newValue = ProxyableByProxy(v);
        GLOBAL_PROXY_HANDLERS.set!.forEach((handler) => handler(target, prop, newValue, oldValue));
        handlers?.set!.forEach((handler) => handler(target, prop, newValue, oldValue));
        (target as any)[prop] = newValue;
        return true;
      },
      deleteProperty(target, prop) {
        const oldValue = (target as any)[prop];
        delete (target as any)[prop];
        GLOBAL_PROXY_HANDLERS.delete!.forEach((handler) => handler(target, prop, oldValue));
        handlers?.delete!.forEach((handler) => handler(target, prop, oldValue));
        return true;
      },
    });
    storeProxyableDataWithTarget(value, ProxyValue);
    return ProxyValue;
  }
  return value;
}
